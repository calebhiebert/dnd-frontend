import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {TruncateModule} from 'ng2-truncate';
import {AppComponent} from './app.component';
import {AlertModule, BsDropdownModule, ModalModule, PopoverModule, ProgressbarModule, TooltipModule, TypeaheadModule} from 'ngx-bootstrap';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {IndexComponent} from './index/index.component';
import {LogoutComponent} from './auth/logout/logout.component';
import {NavbarComponent} from './navbar/navbar.component';
import {IndexCharacterListComponent} from './character/index-character-list/index-character-list.component';
import {CharacterFormComponent} from './character/character-form/character-form.component';
import {CharacterViewComponent} from './character/character-view/character-view.component';
import {IndexCampaignListComponent} from './campaign/index-campaign-list/index-campaign-list.component';
import {CampaignFormComponent} from './campaign/campaign-form/campaign-form.component';
import {CampaignViewComponent} from './campaign/campaign-view/campaign-view.component';
import {CharacterSelectionListComponent} from './campaign/character-selection-list/character-selection-list.component';
import {NotificationsComponent} from './notification/notifications/notifications.component';
import {AttributeEditorComponent} from './attributes/attribute-editor/attribute-editor.component';
import {AttributeEditRowComponent} from './attributes/attribute-edit-row/attribute-edit-row.component';
import {NotificationBubbleComponent} from './notification/notification-bubble/notification-bubble.component';
import {CampaignJoinRequestViewComponent} from './campaign/campaign-join-request-view/campaign-join-request-view.component';
import {JoinRequestRowViewComponent} from './campaign/join-request-row-view/join-request-row-view.component';
import {QuestViewComponent} from './quest/quest-view/quest-view.component';
import {QuestEditorComponent} from './quest/quest-editor/quest-editor.component';
import {CampaignIndexComponent} from './campaign/campaign-index/campaign-index.component';
import {HomeComponent} from './home/home.component';
import {SessionViewComponent} from './session/session-view/session-view.component';
import { SessionCharacterViewComponent } from './session/session-character-view/session-character-view.component';
import { AttributePipe } from './attributes/attribute.pipe';
import { SessionQuickeditFormComponent } from './session/session-quickedit-form/session-quickedit-form.component';
import { ServicesModule } from './services/services.module';
import { SpinnerModule } from './spinner/spinner.module';
import {CharacterModule} from './character/character.module';
import { CampaignModule } from './campaign/campaign.module';
import { QuestModule } from './quest/quest.module';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import {NavbarModule} from './navbar/navbar.module';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'dnd'}),
    BrowserAnimationsModule,
    AppRoutingModule,
    SpinnerModule,
    CharacterModule,
    CampaignModule,
    AuthModule,
    SessionModule,
    NavbarModule,
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
