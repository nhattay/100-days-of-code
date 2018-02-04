import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers, Response} from '@angular/http';

import {AuthenticationService} from '../_services/index';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  model:any = {};
  loading = false;
  error = '';
  apiDomain = 'http://localhost:3000';
  token = '';

  constructor(private http:Http, private router:Router,
              private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    localStorage.removeItem('currentUser');
  }

  login() {
    this.authenticationService.login(this.model.email, this.model.password)
      .subscribe(response => {

        if (response === true) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });

    /*this.loading = true;
    let rs = this.http.post(this.apiDomain + '/user/signin',
      {email: this.model.email, password: this.model.password})
      .subscribe(response => {
          this.loading = false;
          response = response.json();
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.router.navigate(['/dashboard']);
        });*/
  }

}
