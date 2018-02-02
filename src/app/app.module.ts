import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {TruncateModule} from 'ng2-truncate';
import {AppComponent} from './app.component';
import {AlertModule, BsDropdownModule, ModalModule, PopoverModule, TooltipModule, TypeaheadModule} from 'ngx-bootstrap';
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
import {FormsModule} from '@angular/forms';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import {IndexComponent} from './index/index.component';
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
import {NotificationsComponent} from './notifications/notifications.component';
import {NotificationService} from './notification.service';
import {AttributeEditorComponent} from './attribute-editor/attribute-editor.component';
import {AttributeEditRowComponent} from './attribute-edit-row/attribute-edit-row.component';
import {NotificationBubbleComponent} from './notification-bubble/notification-bubble.component';
import {CampaignJoinRequestViewComponent} from './campaign-join-request-view/campaign-join-request-view.component';
import {environment} from '../environments/environment';
import {JoinRequestRowViewComponent} from './join-request-row-view/join-request-row-view.component';
import {QuestViewComponent} from './quest-view/quest-view.component';
import {QuestEditorComponent} from './quest-editor/quest-editor.component';
import {CampaignIndexComponent} from './campaign-index/campaign-index.component';
import { HomeComponent } from './home/home.component';
import { SocketService } from './socket.service';
import {SocketIoConfig, SocketIoModule} from 'ng-socket-io';


const SOCKET_CONFIG: SocketIoConfig = {url: 'http://localhost:5200'};

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
    CharacterSelectionListComponent,
    NotificationsComponent,
    AttributeEditorComponent,
    AttributeEditRowComponent,
    NotificationBubbleComponent,
    CampaignJoinRequestViewComponent,
    JoinRequestRowViewComponent,
    QuestViewComponent,
    QuestEditorComponent,
    CampaignIndexComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'dnd'}),
    AlertModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    TruncateModule,
    TypeaheadModule.forRoot(),
    SocketIoModule.forRoot(SOCKET_CONFIG)
  ],
  providers: [AuthService, AuthGuard, CharacterService, CampaignService, NotificationService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({
        uri: `http://${environment.apiSource}/graphql`,
        withCredentials: true
      }),
      cache: new InMemoryCache()
    });
  }
}
