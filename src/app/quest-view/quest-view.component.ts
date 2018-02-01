import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {GET_QUESTS_QUERY} from '../quest-editor/quest-editor.component';
import {GetCampaignResponse, Quest} from '../types';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-quest-view',
  templateUrl: './quest-view.component.html',
  styleUrls: ['./quest-view.component.css']
})
export class QuestViewComponent implements OnInit {

  @Input()
  campaignId: number;

  @Input()
  editable: boolean;

  quests: Array<Quest>;

  questEditorModalRef: BsModalRef;

  loading = false;

  constructor(private apollo: Apollo, private modalService: BsModalService) { }

  ngOnInit() {
    this.loadData();
  }

  openModal(template: TemplateRef<any>) {
    this.questEditorModalRef = this.modalService.show(template);
  }

  loadData() {
    this.loading = true;

    this.apollo.watchQuery<GetCampaignResponse>({
      query: GET_QUESTS_QUERY,

      variables: {
        id: this.campaignId
      }
    }).valueChanges
    .map(resp => resp.data.getCampaign.quests)
    .subscribe(quests => {
      this.quests = quests;
      this.loading = false;
    });
  }
}
