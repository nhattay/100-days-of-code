import {Component, OnInit} from '@angular/core';
// import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Http, Headers, Response} from '@angular/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http:Http,
              private httpHeaders:Headers) {
  }

  model:any = {};
  user;
  apiDomain = 'http://localhost:3000';
  loading = false;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    const headers = new Headers().set('authorization', this.user.token);

    this.http.get(this.apiDomain + '/convesation/list', {headers})
      .subscribe(response => {
          this.loading = false;
          // response = response.json();
        },
        err => {
          // this.loading = false;
        });
  }

}
