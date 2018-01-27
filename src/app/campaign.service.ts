import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Campaign} from './types';

const MY_CAMPAIGNS_QUERY = gql`
  query GetMyCampaigns {
    me {
      campaigns {
        id
        name
        description
      }
    }
  }`;

const GET_CAMPAIGN_QUERY = gql`
  query GetCampaign($id: ID!) {
    getCampaign(id: $id) {
      id
      name
      description
    }
  }`;

@Injectable()
export class CampaignService {

  constructor(private apollo: Apollo) { }


  getMyCampaigns() {
    return this.apollo.watchQuery<GetMyCampaignsResponse>({
      query: MY_CAMPAIGNS_QUERY
    }).valueChanges;
  }

  getCampaign(id: number) {
    return this.apollo.watchQuery<GetCampaignResponse>({
      query: GET_CAMPAIGN_QUERY,

      variables: {
        id
      }
    }).valueChanges;
  }
}

interface GetCampaignResponse {
  getCampaign: Campaign;
}

interface GetMyCampaignsResponse {
  me: {
    campaigns: Array<Campaign>;
  };
}
