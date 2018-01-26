import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AlertModule} from "ngx-bootstrap";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {Apollo, ApolloModule} from "apollo-angular";
import {HttpLink, HttpLinkModule} from "apollo-angular-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import { SpinnerComponent } from './spinner/spinner.component';
import {FormsModule, NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import { AuthGuard } from './auth.guard';
import { IndexComponent } from './index/index.component';
import { TokenService } from './token.service';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SpinnerComponent,
    IndexComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    FormsModule
  ],
  providers: [AuthService, AuthGuard, TokenService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({
        uri: 'http://localhost/graphql',
        withCredentials: true
      }),
      cache: new InMemoryCache()
    })
  }
}
