import { Component, OnInit, Input } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private http:Http) { }

  @Input() conversationId: {
    conversationId: string,
    createdAt: string,
    body: string,
    user: {
      username: string,
      email: string
    }
  };

  messages = [];
  user = {};
  apiDomain = 'http://localhost:3000/';
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.getConversation(this.conversationId);
  }

  getConversation(conversationId) {
    conversationId = conversationId || null;

    if(!conversationId){
      return;
    }
    var headers = new Headers({'Authorization': 'JWT ' + this.user.token});
    var options = new RequestOptions({headers: headers});
    options.params = {
      conversationId: conversationId
    };

    // get users from api
    this.http.get(this.apiDomain + 'convesation/get', options)
      .subscribe(response => {
        var result = response.json();
        this.messages = result.data;
      });
    return;
  }

}
