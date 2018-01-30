import {Component, Input, OnInit} from '@angular/core';
import gql from 'graphql-tag';

const JOIN_REQUEST_QUERY = gql`
  query GetJoinRequests($id: ID!) {
    getCampaign(id: $id) {
      id
      joinRequests {
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

  constructor() { }

  ngOnInit() {
  }

  loadData() {
    
  }
}
