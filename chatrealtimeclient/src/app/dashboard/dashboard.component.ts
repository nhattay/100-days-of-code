import {Component, OnInit} from '@angular/core';
// import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http:Http) {
  }

  model:any = {};
  user;
  apiDomain = 'http://localhost:3000/';
  convesations = [];
  loading = false;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    var headers = new Headers({ 'Authorization': 'JWT ' + this.user.token });
    var options = new RequestOptions({headers: headers});


    // get users from api
    this.http.get(this.apiDomain + 'convesation/list', options)
      .subscribe(response => {
        // this.loading = false;
        response = response.json();
        this.convesations = response.data;
        console.log(this.convesations);
      });
    return;

  }

}
