import {Component, Input, OnInit} from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';

const JOIN_REQUEST_QUERY = gql`
  query GetJoinRequests($id: ID!) {
    getCampaign(id: $id) {
      id
      joinRequests(status: [WAITING]) {
        id
        status
        character {
          id
          name
          creator {
            username
          }
        }
      }
    }
  }`;

@Component({
  selector: 'app-campaign-join-request-view',
  templateUrl: './campaign-join-request-view.component.html',
  styleUrls: ['./campaign-join-request-view.component.css']
})
export class CampaignJoinRequestViewComponent implements OnInit {

  @Input()
  campaignId: number;

  joinRequests: Array<any>;

  campaign: any;

  loading = false;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.apollo.query({
      query: JOIN_REQUEST_QUERY,

      variables: {
        id: this.campaignId
      }
    }).map((resp: any) => resp.data.getCampaign)
      .subscribe(campaign => {
        this.campaign = campaign;
        this.loading = false;
      });
  }
}
