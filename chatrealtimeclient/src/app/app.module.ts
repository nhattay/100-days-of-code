import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {LoginformComponent} from './loginform/loginform.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ConversationsComponent} from './conversations/conversations.component';
import {MessagesComponent} from './messages/messages.component';

const appRoutes:Routes = [
  {path: 'login', component: LoginformComponent},
  {path: 'dashboard', component: DashboardComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    DashboardComponent,
    ConversationsComponent,
    MessagesComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
      // , {enableTracing: true} // <-- debugging purposes only
    ),
    FormsModule,
    HttpModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
