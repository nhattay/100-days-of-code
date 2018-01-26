import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent {
  @Input() convesation: {
    conversationId: string,
    createdAt: string,
    body: string,
    user: {
      username: string,
      email: string
    }
  };
  constructor() { }

  ngOnInit() {
    // console.log(convesation);
  }

}
