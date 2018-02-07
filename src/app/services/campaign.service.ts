import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Campaign, CharacterCampaignOperationResponse, GetCampaignResponse, GetCampaignsResponse} from '../types';
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

export const GET_CAMPAIGN_QUERY = gql`
  query GetCampaign($id: ID!, $characters: Boolean!, $joinRequests: Boolean!, $quests: Boolean!) {
    getCampaign(id: $id) {
      ...CampaignFields

      characters @include(if: $characters) {
        id
        name
        description
        hp
        maxHp
        creator {
          username
        }
      }

      joinRequests(status: [WAITING]) @include(if: $joinRequests) {
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

      quests @include(if: $quests) {
        id
        name
        description
      }
    }
  }

${CAMPAIGN_FRAGMENT}`;

const CREATE_CAMPAIGN_MUTATION = gql`
  mutation CreateCampaign($input: CampaignInput!) {
    createCampaign(input: $input) {
      ...CampaignFields
    }
  } ${CAMPAIGN_FRAGMENT}`;

const EDIT_CAMPAIGN_MUTATION = gql`
  mutation EditCampaign($id: ID!, $input: CampaignInput!) {
    editCampaign(id: $id, input: $input) {
      ...CampaignFields
    }
  }

${CAMPAIGN_FRAGMENT}`;

const CAMPAIGN_SEARCH_QUERY = gql`
  query GetCampaignsQuery($searchTerm: String) {
    getCampaigns(searchTerm: $searchTerm) {
      id
      name
      description
    }
  }`;

const JOIN_REQUEST_OPERATION_MUTATION = gql`
  mutation JoinRequestOperation($id: ID!, $op: CampaignJoinRequestOperation!) {
    campaignJoinRequestOperation(campaignJoinRequestId: $id, op: $op)
  }`;

@Injectable()
export class CampaignService {

  private _campaignSubscribeList: string[] = [];

  constructor(private apollo: Apollo, private socket: Socket) {
    socket.fromEvent('campaign-update')
      .subscribe(campaignId => {
        apollo.query({
          query: GET_CAMPAIGN_QUERY,
          variables: {
            id: campaignId,
            characters: true,
            joinRequests: true,
            quests: false
          },
          fetchPolicy: 'network-only'
        })
          .toPromise().then(() => {
        });
      });
  }

  getMine() {
    return this.apollo.watchQuery<MyCampaignsResponse>({
      query: MY_CAMPAIGNS_QUERY,
    }).valueChanges.map(resp => resp.data.me.campaigns);
  }

  get(id: string, {characters = false, subscribe = false, joinRequests = false, quests = false}: { characters?: boolean, subscribe?: boolean, joinRequests?: boolean, quests?: boolean } = {}) {

    if (subscribe) {
      this.subscribe(id);
    }

    return this.apollo.watchQuery<GetCampaignResponse>({
      query: GET_CAMPAIGN_QUERY,

      variables: {
        id,
        characters,
        joinRequests,
        quests
      }
    }).valueChanges.map(resp => resp.data.getCampaign);
  }

  subscribe(id: string) {
    const channel = `campaign-update-${id}`;

    this._campaignSubscribeList.push(channel);
    this.socket.emit('sub', channel);
  }

  unSubscribeAllCampaigns() {
    this._campaignSubscribeList.forEach(channel => {
      this.socket.emit('unsub', channel);
    });
  }

  create(campaign: Campaign) {
    return this.apollo.mutate<CreateCampaignResponse>({
      mutation: CREATE_CAMPAIGN_MUTATION,

      variables: {
        input: campaign
      },

      update(store, {data}) {
        store.writeQuery({
          query: GET_CAMPAIGN_QUERY,
          data: {
            getCampaign: data.createCampaign
          },
          variables: {
            id: data.createCampaign.id,
            quests: false,
            joinRequests: false,
            characters: false
          }
        });
      },

      refetchQueries: [
        {query: MY_CAMPAIGNS_QUERY}
      ]
    })
      .map(resp => resp.data.createCampaign)
      .toPromise();
  }

  edit(campaign: Campaign) {
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
      .map(resp => resp.data.editCampaign)
      .toPromise();
  }

  delete(campaignId: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteCampaign($id: ID!) {
          deleteCampaign(id: $id)
        }`,

      variables: {
        id: campaignId
      },

      update: (store) => {
        store.writeQuery({
          query: gql`
            query RemoveCampaignQuery($id: ID!) {
              getCampaign(id: $id) {
                id
              }
            }`, variables: {id: campaignId}, data: null
        });
      },

      refetchQueries: [
        {query: MY_CAMPAIGNS_QUERY}
      ]
    }).toPromise();
  }

  getCharactersThatCanJoin(campaignId: string) {
    return this.apollo.query({
      query: gql`
        query GetMyCharactersWithCampaigns($campaignId: ID!) {
          getCampaignJoinableCharacters(campaignId: $campaignId) {
            id
            name
          }
        }`,

      fetchPolicy: 'network-only',

      variables: {
        campaignId
      }
    })
    .map((resp: any) => resp.data.getCampaignJoinableCharacters)
    .toPromise();
  }

  joinRequestOperation(joinRequestId: string, operation: string, campaignId: string) {
    return this.apollo.mutate({
      mutation: JOIN_REQUEST_OPERATION_MUTATION,

      variables: {
        id: joinRequestId,
        op: operation
      },

      refetchQueries: [
        {
          query: GET_CAMPAIGN_QUERY,

          variables: {
            id: campaignId,
            characters: true,
            joinRequests: true,
            quests: false
          }
        }
      ]
    }).toPromise();
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

      refetchQueries: [{
          query: GET_CAMPAIGN_QUERY,
          variables: {
            id: campaignId,
            quests: false,
            characters: true,
            joinRequests: true,
          }
        }
      ]
    }).map(resp => resp.data.characterCampaignOperation).toPromise();
  }

  search(searchTerm: string) {
    return this.apollo.query<GetCampaignsResponse>({
      query: CAMPAIGN_SEARCH_QUERY,

      variables: {
        searchTerm: searchTerm
      }
    }).map(resp => resp.data.getCampaigns)
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
