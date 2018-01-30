import { Component, OnInit, Input } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private http:Http) { }

  @Input() conversation: {
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
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    let conversation = this.conversation;
    console.log(this.conversation);
    if(conversation && conversation.conversationId){
      // this.getConversation(conversation.conversationId);
    }
  }

  /*getConversation(conversationId) {
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
        this.conversation = result.data;
      });
    return;
  }*/

}
