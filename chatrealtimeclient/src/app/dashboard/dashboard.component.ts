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
  conversations = [];
  conversation = [];

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getConversations();
  }

  getConversations() {

    var headers = new Headers({'Authorization': 'JWT ' + this.user.token});
    var options = new RequestOptions({headers: headers});


    // get users from api
    this.http.get(this.apiDomain + 'convesation/list', options)
      .subscribe(response => {
        var result = response.json();
        this.conversations = result.data;

        if(this.conversations && this.conversations[0]){
          let firstConversation = this.conversations[0];
          this.getConversation(firstConversation.conversationId);
        }
      });
    return;
  }

  getConversation(conversationId) {
    var headers = new Headers({'Authorization': 'JWT ' + this.user.token});
    var options = new RequestOptions({headers: headers});
    options.params = {
      conversationId: conversationId
    };

    // get users from api
    this.http.get(this.apiDomain + 'convesation/get', options)
      .subscribe(response => {
        var result = response.json();
        this.conversation = result.data;
      });
    return;
  }

}
