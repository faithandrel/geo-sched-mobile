import { Injectable } from '@angular/core';
import { Storage, LocalStorage } from 'ionic-angular';
import { Headers, Http, Response, Request, RequestOptions, RequestMethod } from '@angular/http';
import { AuthHttp, AuthConfig, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BackEndService {
  private backEndUrl = 'http://2a64dfbd.ngrok.io/standbyme/public/';  // URL to web api
  backEndToken: string;
  private signupSession: string;
  theResponse: any;
  local: Storage = new Storage(LocalStorage);
  jwtToken: any;
  
  constructor(private http: Http) {
    this.getBackEndToken()
        .then(res => {
            this.getSavedJwt();
        })
        .catch(this.handleError);
  }
  
  getUrl() {
    return this.backEndUrl;
  }
  
  getBackEndToken(): Promise<any> {
    return this.http.get(this.backEndUrl+'test-token')
               .toPromise()
               .then(res => {
                  this.backEndToken = res.json();
                  return res.json();
                })
               .catch(this.handleError);
  }
  
  addNewUser (name: string) {
    let body = "title=" + name + "&_token=" + this.backEndToken;
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    var options = new RequestOptions({
      method: RequestMethod.Post,
      url: this.backEndUrl+'test-save-from-app',
      headers: myHeaders,
      body: body
    });
    var req = new Request(options);
    
    console.log(myHeaders);
    return this.http.request(req)
          .toPromise()
          .then(res => res.json())
          .catch(this.handleError);
  }
  
  facebookSignUp(username: string, password: string) {
    let body = "username=" + username + "&password=" + password + "&_token=" + this.backEndToken;
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    var options = new RequestOptions({
      method: RequestMethod.Post,
      url: this.backEndUrl+'fb-sign-up-from-app',
      headers: myHeaders,
      body: body,
    });
    var req = new Request(options);
    
    console.log(myHeaders);
    return this.http.request(req)
          .toPromise()
          .then(res => {
            this.signupSession = res.json();
            open(this.backEndUrl+'sign-up-facebook?signup='+this.signupSession);
          })
          .catch(this.handleError);
    
  }
  
  getItems() {
    var auth = 'Bearer ' + this.getJwtToken();
  
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append('Authorization', auth);
    var options = new RequestOptions({
      method: RequestMethod.Get,
      url: this.backEndUrl+'get-items',
      headers: myHeaders,
    });
  
    var req = new Request(options);
    
    return this.http.request(req)
          .toPromise()
          .then(res => JSON.stringify(res.json()))
          .catch(this.handleError);
  }
  
  saveItem(item) {
    var body = JSON.stringify(item);
    var auth = 'Bearer ' + this.getJwtToken();
    
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', auth);
    var options = new RequestOptions({
      method: RequestMethod.Post,
      url: this.backEndUrl+'save-item',
      headers: myHeaders,
      body: body
    });
    console.log(auth);
    var req = new Request(options);
    
    return this.http.request(req)
          .toPromise()
          .then(res => JSON.stringify(res.json()))
          .catch(this.handleError);
  }
  
  getSavedJwt() {
    this.local.get('id_token').then(profile => {
      this.jwtToken = profile;
    });
  }
  
  getJwtToken() {
    return this.jwtToken;
  }
  
  authSuccess(token) {
    this.local.set('id_token', token);
  }
  
  isLoggedIn() {
    return tokenNotExpired();
  }
  
  loginTheUser(userObject) {
    let body = "username=" + userObject.username + "&password=" + userObject.password + "&_token=" + this.backEndToken;
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    var options = new RequestOptions({
      method: RequestMethod.Post,
      url: this.backEndUrl+'test-auth',
      headers: myHeaders,
      body: body,
    });
    
    var req = new Request(options);
    
    return this.http.request(req)
          .toPromise()
          .then(res => {
            let data = res.json();
            if (data.token != undefined ) {
              this.authSuccess(data.token);
              this.jwtToken = data.token;
              return true;
            }
            else {
              return false;
            }
          })
          .catch(this.handleError);
  }
  

  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }
}