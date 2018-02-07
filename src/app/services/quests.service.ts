import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {CreateQuestResponse, DeleteQuestResponse, EditQuestResponse, GetCampaignResponse, Quest} from '../types';
import {GET_CAMPAIGN_QUERY} from './campaign.service';
import gql from 'graphql-tag';

export const CREATE_QUEST_MUTATION = gql`
  mutation CreateQuest($campId: ID!, $input: QuestInput!) {
    createQuest(campaignId: $campId, input: $input) {
      id
      name
      description
    }
  }`;

export const EDIT_QUEST_MUTATION = gql`
  mutation EditQuest($id: ID!, $input: QuestInput!) {
    editQuest(id: $id, input: $input) {
      id
      name
      description
    }
  }`;

export const DELETE_QUEST_MUTATION = gql`
  mutation DeleteQuest($id: ID!) {
    deleteQuest(id: $id)
  }`;


@Injectable()
export class QuestsService {

  constructor(private apollo: Apollo) { }

  create(quest: Quest, campaignId: string) {
    return this.apollo.mutate<CreateQuestResponse>({
      mutation: CREATE_QUEST_MUTATION,

      variables: {
        campId: campaignId,
        input: {
          name: quest.name,
          description: quest.description
        }
      },

      update: (store, {data}) => {
        const storeData = store.readQuery<GetCampaignResponse>({
          query: GET_CAMPAIGN_QUERY,
          variables: {
            id: campaignId,
            quests: true,
            joinRequests: false,
            characters: false
          }
        });

        storeData.getCampaign.quests.push(data.createQuest);

        store.writeQuery({
          query: GET_CAMPAIGN_QUERY,
          variables: {
            id: campaignId,
            quests: true,
            joinRequests: false,
            characters: false
          },
          data: storeData
        });
      }
    }).map(resp => resp.data.createQuest)
      .toPromise();
  }

  edit(quest: Quest) {
    return this.apollo.mutate<EditQuestResponse>({
      mutation: EDIT_QUEST_MUTATION,

      variables: {
        id: quest.id,
        input: {
          name: quest.name,
          description: quest.description
        }
      }
    }).toPromise();
  }

  delete(questId: string, campaignId: string) {
    return this.apollo.mutate<DeleteQuestResponse>({
      mutation: DELETE_QUEST_MUTATION,

      variables: {
        id: questId
      },

      update: (store) => {
        const storeData = store.readQuery<GetCampaignResponse>({
          query: GET_CAMPAIGN_QUERY,
          variables: {
            id: campaignId,
            quests: true,
            joinRequests: false,
            characters: false
          }
        });

        storeData.getCampaign.quests = storeData.getCampaign.quests.filter(quest => quest.id !== questId);

        store.writeQuery({
          query: GET_CAMPAIGN_QUERY,
          variables: {
            id: campaignId,
            quests: true,
            joinRequests: false,
            characters: false
          },
          data: storeData});
      }
    }).toPromise();
  }
}
