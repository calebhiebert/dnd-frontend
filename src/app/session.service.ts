import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {CreateSessionResponse, FinishSessionResponse, GetCampaignResponse, GetCharacterResponse} from './types';

const SESSION_FRAGMENT = gql`
  fragment SessionFields on Session {
    id
    createdAt
    status
    finishedAt
    notes
  }
`;

const CREATE_SESSION_MUTATION = gql`
  mutation CreateSession($campaignId: ID!) {
    createSession(campaignId: $campaignId) {
      ...SessionFields
    }
  }
${SESSION_FRAGMENT}`;

const FINISH_SESSION_MUTATION = gql`
  mutation FinishSession($id: ID!) {
    finishSession(id: $id) {
      ...SessionFields
    }
  }
${SESSION_FRAGMENT}`;

const SESSION_CHARACTER_QUERY = gql`
  query GetSessionCharacter($id: ID!) {
    getCharacter(id: $id) {
      id
      name
      hp
      maxHp
    }
  }
`;

const CAMPAIGN_SESSION_RESPONSE = gql`
  query GetSessionForCampaign($campaignId: ID!, $includeAll: Boolean!, $chr: Boolean!) {
    getCampaign(id: $campaignId) {
      id
      name
      session {
        ...SessionFields
      }

      characters @include(if: $chr) {
        id
        name
        hp
        maxHp
        attributes {
          key
          dataType
          nValue
          sValue
        }
      }

      sessions @include(if: $includeAll) {
        ...SessionFields
      }
    }
  }
${SESSION_FRAGMENT}`;

@Injectable()
export class SessionService {

  constructor(private apollo: Apollo) {
  }

  startSession(campaignId: string) {
    return this.apollo.mutate<CreateSessionResponse>({
      mutation: CREATE_SESSION_MUTATION,

      variables: {
        campaignId: campaignId
      },

      update: (store, {data}) => {
        const storeData = store.readQuery<GetCampaignResponse>({
          query: CAMPAIGN_SESSION_RESPONSE,
          variables: {campaignId, includeAll: false, chr: false}
        });

        storeData.getCampaign.session = data.createSession;

        store.writeQuery({query: CAMPAIGN_SESSION_RESPONSE, variables: {campaignId, includeAll: false, chr: false}, data: storeData});
      }
    }).map(resp => resp.data.createSession)
      .toPromise();
  }

  finishSession(sessionId: string) {
    return this.apollo.mutate<FinishSessionResponse>({
      mutation: FINISH_SESSION_MUTATION,

      variables: {
        id: sessionId
      }
    }).map(resp => resp.data.finishSession)
      .toPromise();
  }

  getSessionCharacter(characterId: string) {
    return this.apollo.query<GetCharacterResponse>({
      query: SESSION_CHARACTER_QUERY,

      variables: {
        id: characterId
      }
    }).map(resp => resp.data.getCharacter).toPromise();
  }

  getCampaignSession(campaignId: string, includePast: boolean = false, includeCharacters: boolean = false) {
    return this.apollo.watchQuery<GetCampaignResponse>({
      query: CAMPAIGN_SESSION_RESPONSE,

      variables: {
        campaignId,
        includeAll: includePast,
        chr: includeCharacters
      }
    }).valueChanges.map(resp => resp.data.getCampaign);
  }
}
