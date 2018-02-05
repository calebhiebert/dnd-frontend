import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {CreateSessionResponse, FinishSessionResponse, GetCampaignResponse} from './types';

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

const CAMPAIGN_SESSION_RESPONSE = gql`
  query GetSessionForCampaign($campaignId: ID!, $includeAll: Boolean!) {
    getCampaign(id: $campaignId) {
      id
      name
      session {
        ...SessionFields
      }

      sessions @include(if: $includeAll) {
        ...SessionFields
      }
    }
  }
  ${SESSION_FRAGMENT}`;

@Injectable()
export class SessionService {

  constructor(private apollo: Apollo) { }

  startSession(campaignId: string) {
    return this.apollo.mutate<CreateSessionResponse>({
      mutation: CREATE_SESSION_MUTATION,

      variables: {
        campaignId: campaignId
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

  getCampaignSession(campaignId: string, includePast: boolean = false) {
    return this.apollo.watchQuery<GetCampaignResponse>({
      query: CAMPAIGN_SESSION_RESPONSE,

      variables: {
        campaignId,
        includeAll: includePast
      }
    }).valueChanges.map(resp => resp.data.getCampaign.session);
  }
}
