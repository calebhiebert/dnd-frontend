import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import {Subscription} from 'rxjs/Subscription';

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
export class CampaignJoinRequestViewComponent implements OnInit, OnDestroy {

  @Input()
  campaignId: string;

  joinRequests: Array<any>;

  campaign: any;

  loading = false;

  sub: Subscription;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  loadData() {
    this.loading = true;

    this.sub = this.apollo.watchQuery({
      query: JOIN_REQUEST_QUERY,

      variables: {
        id: this.campaignId
      }
    }).valueChanges.map((resp: any) => resp.data.getCampaign)
      .subscribe(campaign => {
        this.campaign = campaign;
        this.joinRequests = campaign.joinRequests;
        this.loading = false;
      });
  }
}
