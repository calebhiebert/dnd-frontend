import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AlertModule, BsModalService, ModalModule} from 'ngx-bootstrap';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {SpinnerComponent} from './spinner/spinner.component';
import {FormsModule, NgForm} from '@angular/forms';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import {IndexComponent} from './index/index.component';
import {TokenService} from './token.service';
import {LogoutComponent} from './logout/logout.component';
import {NavbarComponent} from './navbar/navbar.component';
import {IndexCharacterListComponent} from './index-character-list/index-character-list.component';
import {CharacterService} from './character.service';
import {CharacterFormComponent} from './character-form/character-form.component';
import {CharacterViewComponent} from './character-view/character-view.component';
import {IndexCampaignListComponent} from './index-campaign-list/index-campaign-list.component';
import {CampaignFormComponent} from './campaign-form/campaign-form.component';
import {CampaignService} from './campaign.service';
import {CampaignViewComponent} from './campaign-view/campaign-view.component';
import {CharacterSelectionListComponent} from './character-selection-list/character-selection-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SpinnerComponent,
    IndexComponent,
    LogoutComponent,
    NavbarComponent,
    IndexCharacterListComponent,
    CharacterFormComponent,
    CharacterViewComponent,
    IndexCampaignListComponent,
    CampaignFormComponent,
    CampaignViewComponent,
    CharacterSelectionListComponent
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
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, TokenService, CharacterService, CampaignService],
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
    });
  }
}
