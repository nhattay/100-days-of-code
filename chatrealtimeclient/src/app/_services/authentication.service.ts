import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;
    public apiDomain = '//localhost:3000';

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(email: string, password: string): Observable<boolean> {

      return this.http.post(this.apiDomain + '/user/signin',
        {email: email, password: password})
        .map((response: Response) => {
          let token = response.json() && response.json().token;
          if (token) {
            this.token = token;
            localStorage.setItem('currentUser', JSON.stringify(response));
            return true;
          } else {
            return false;
          }
        })
        /*.subscribe(response => {
          response = response.json();
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.router.navigate(['/dashboard']);
        })*/;
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}