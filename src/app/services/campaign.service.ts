import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Campaign, CharacterCampaignOperationResponse, GetCampaignResponse} from '../types';
import gql from 'graphql-tag';
import {Socket} from 'ng-socket-io';

export const CAMPAIGN_FRAGMENT = gql`
  fragment CampaignFields on Campaign {
    id
    name
    description
    mine
    session {
      id
    }
  }
`;

export const MY_CAMPAIGNS_QUERY = gql`
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

const CAMPAIGN_VIEW_QUERY = gql`
  query GetCampaignForViewScreen($id: ID!) {
    getCampaign(id: $id) {
      id
      name
      description
      mine
      session {
        id
      }
      characters {
        id
        name
        description
        hp
        maxHp
        creator {
          username
        }
      }
    }
  }`;

@Injectable()
export class CampaignService {

  private _campaignSubscribeList: string[] = [];

  constructor(private apollo: Apollo, private socket: Socket) {
    socket.fromEvent('campaign-update')
      .subscribe(campaignId => {
        apollo.query({query: CAMPAIGN_VIEW_QUERY, variables: {id: campaignId}, fetchPolicy: 'network-only'})
          .toPromise().then(() => {});
      });
  }

  getMyCampaigns() {
    return this.apollo.watchQuery<MyCampaignsResponse>({
      query: MY_CAMPAIGNS_QUERY,
    }).valueChanges.map(resp => resp.data.me.campaigns);
  }

  getCampaign(id: string) {
    return this.apollo.watchQuery<GetCampaignResponse>({
      query: GET_CAMPAIGN_QUERY,

      variables: {
        id
      }
    }).valueChanges.map(resp => resp.data.getCampaign);
  }

  subscribeCampaign(id: string) {
    const channel = `campaign-update-${id}`;

    this._campaignSubscribeList.push(channel);
    this.socket.emit('sub', channel);
  }

  unSubscribeCampaign(id: string) {
    this.socket.emit('unsub', `campaign-update-${id}`);
  }

  unSubscribeAllCampaigns() {
    this._campaignSubscribeList.forEach(channel => {
      this.socket.emit('unsub', channel);
    });
  }

  getCampaignForView(id: string) {
    this.socket.emit('sub', `campaign-update-${id}`);

    return this.apollo.watchQuery<GetCampaignResponse>({
      query: CAMPAIGN_VIEW_QUERY,

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
      },

      refetchQueries: [
        {query: MY_CAMPAIGNS_QUERY}
      ]
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
      },

      refetchQueries: [
        {query: MY_CAMPAIGNS_QUERY}
      ]
    })
      .map(resp => resp.data.editCampaign);
  }

  characterJoinCampaign(characterId: string, campaignId: string) {
    return this.apollo.mutate<CharacterCampaignOperationResponse>({
      mutation: gql`
        mutation CharacterJoinCampaign($charId: ID!, $campId: ID!, $op: CharacterCampaignOperation!) {
          characterCampaignOperation(characterId: $charId, campaignId: $campId, op: $op)
        }`,

      variables: {
        charId: characterId,
        campId: campaignId,
        op: 'JOIN',
      },

      refetchQueries: [
        {query: CAMPAIGN_VIEW_QUERY, variables: {id: campaignId}}
      ]
    }).map(resp => resp.data.characterCampaignOperation)
    .toPromise();
  }
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
