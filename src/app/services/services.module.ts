import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CharacterService} from './character.service';
import {SessionService} from './session.service';
import {CampaignService} from './campaign.service';
import {NotificationService} from './notification.service';
import {SocketService} from './socket.service';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import {SocketIoConfig, SocketIoModule} from 'ng-socket-io';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {environment} from '../../environments/environment';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { AttributeService } from './attribute.service';
import { QuestsService } from './quests.service';

const SOCKET_CONFIG: SocketIoConfig = {url: 'http://localhost:5200'};

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    SocketIoModule.forRoot(SOCKET_CONFIG),
    ToastrModule.forRoot()
  ],
  declarations: [],
  providers: [AuthService, AuthGuard, CharacterService, CampaignService, NotificationService, ToastrService, SocketService, SessionService, AttributeService, QuestsService]
})
export class ServicesModule {
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
