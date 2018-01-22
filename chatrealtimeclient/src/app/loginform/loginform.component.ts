import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers, Response} from '@angular/http';

// import {AuthenticationService} from '../_services/index';

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

  constructor(private http:Http, private router:Router) {

  }

  ngOnInit() {
    localStorage.removeItem('currentUser');
  }

  login() {
    this.loading = true;
    let rs = this.http.post(this.apiDomain + '/user/signin',
      {email: this.model.email, password: this.model.password})
      .subscribe(response => {
        this.loading = false;
        response = response.json();
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.router.navigate(['/dashboard']);
      });
  }

}
