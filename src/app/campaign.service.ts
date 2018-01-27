import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Campaign} from './types';
import gql from 'graphql-tag';

const CAMPAIGN_FRAGMENT = gql`
  fragment CampaignFields on Campaign {
    id
    name
    description
    mine
  }
`;

const MY_CAMPAIGNS_QUERY = gql`
  query GetMyCampaigns {
    me {
      campaigns {
        ...CampaignFields
      }
    }
  }

  ${CAMPAIGN_FRAGMENT}`;

const GET_CAMPAIGN_QUERY = gql`
  query GetCampaign($id: ID!) {
    getCampaign(id: $id) {
      ...CampaignFields
    }
  }

  ${CAMPAIGN_FRAGMENT}`;

const CREATE_CAMPAIGN_MUTATION = gql`
  mutation CreateCampaign($input: CampaignInput!) {
    createCampaign(input: $input) {
      ...CampaignFields
    }
  }

  ${CAMPAIGN_FRAGMENT}`;

const EDIT_CAMPAIGN_MUTATION = gql`
  mutation EditCampaign($id: ID!, $input: CampaignInput!) {
    editCampaign(id: $id, input: $input) {
      ...CampaignFields
    }
  }

  ${CAMPAIGN_FRAGMENT}`;

@Injectable()
export class CampaignService {

  constructor(private apollo: Apollo) { }


  getMyCampaigns() {
    return this.apollo.watchQuery<MyCampaignsResponse>({
      query: MY_CAMPAIGNS_QUERY
    }).valueChanges.map(resp => resp.data.me.campaigns);
  }

  getCampaign(id: number) {
    return this.apollo.watchQuery<GetCampaignResponse>({
      query: GET_CAMPAIGN_QUERY,

      variables: {
        id
      }
    }).valueChanges.map(resp => resp.data.getCampaign);
  }

  createCampaign(campaign: Campaign) {
    return this.apollo.mutate<CreateCampaignResponse>({
      mutation: CREATE_CAMPAIGN_MUTATION,

      variables: {
        input: campaign
      },

      update(store, {data}) {
        store.writeQuery({query: GET_CAMPAIGN_QUERY, data: {getCampaign: data.createCampaign}, variables: {id: data.createCampaign.id}});
      }
    })
      .map(resp => resp.data.createCampaign);
  }

  editCampaign(campaign: Campaign) {
    return this.apollo.mutate<EditCampaignResponse>({
      mutation: EDIT_CAMPAIGN_MUTATION,

      variables: {
        id: campaign.id,
        input: {
          name: campaign.name,
          description: campaign.description
        }
      }
    })
      .map(resp => resp.data.editCampaign);
  }
}

interface GetCampaignResponse {
  getCampaign: Campaign;
}

interface MyCampaignsResponse {
  me: {
    campaigns: Array<Campaign>;
  };
}

interface CreateCampaignResponse {
  createCampaign: Campaign;
}

interface EditCampaignResponse {
  editCampaign: Campaign;
}
