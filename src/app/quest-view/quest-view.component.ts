import {Component, Input, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {GET_QUESTS_QUERY} from '../quest-editor/quest-editor.component';

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

  quests: Array<any>;

  loading = false;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.apollo.watchQuery({
      query: GET_QUESTS_QUERY,

      variables: {
        id: this.campaignId
      }
    }).valueChanges
    .map((resp: any) => resp.data.getCampaign.quests)
    .subscribe(quests => {
      this.quests = quests;
      this.loading = false;
    });
  }

}
