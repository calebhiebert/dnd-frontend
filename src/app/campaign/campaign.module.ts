import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CampaignFormComponent} from './campaign-form/campaign-form.component';
import {CampaignIndexComponent} from './campaign-index/campaign-index.component';
import {CampaignJoinRequestViewComponent} from './campaign-join-request-view/campaign-join-request-view.component';
import {CampaignViewComponent} from './campaign-view/campaign-view.component';
import {IndexCampaignListComponent} from './index-campaign-list/index-campaign-list.component';
import {SpinnerModule} from '../spinner/spinner.module';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {TruncateModule} from 'ng2-truncate';
import {JoinRequestRowViewComponent} from './join-request-row-view/join-request-row-view.component';
import {QuestModule} from '../quest/quest.module';
import {CharacterSelectionListComponent} from './character-selection-list/character-selection-list.component';
import {AlertModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SpinnerModule,
    FormsModule,
    AppRoutingModule,
    TruncateModule,
    QuestModule,
    AlertModule.forRoot()
  ],
  declarations: [
    CampaignFormComponent,
    CampaignIndexComponent,
    CampaignJoinRequestViewComponent,
    CampaignViewComponent,
    IndexCampaignListComponent,
    JoinRequestRowViewComponent,
    CharacterSelectionListComponent
  ],
  exports: [
    CampaignFormComponent,
    CampaignIndexComponent,
    CampaignViewComponent,
    IndexCampaignListComponent
  ]
})
export class CampaignModule {
}
