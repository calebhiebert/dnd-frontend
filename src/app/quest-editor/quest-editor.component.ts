import {Component, Input, OnInit} from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import {Campaign, CreateQuestResponse, EditQuestResponse, GetCampaignResponse, Quest} from '../types';
import {variable} from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-quest-editor',
  templateUrl: './quest-editor.component.html',
  styleUrls: ['./quest-editor.component.css']
})
export class QuestEditorComponent implements OnInit {

  @Input()
  campaignId: number;

  quests: Array<Quest>;

  loading = false;

  editingQuest: Quest = null;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.getQuests();
  }

  getQuests() {
    this.loading = true;

    this.apollo.watchQuery({
      query: GET_QUESTS_QUERY,

      variables: {
        id: this.campaignId
      }
    }).valueChanges
      .map((resp: any) => resp.data.getCampaign.quests)
      .subscribe(quests => {
        this.quests = quests;
        this.loading = false;
      });
  }

  newQuest() {
    this.editingQuest = new Quest();
  }

  selectQuest(quest) {
    this.editingQuest = Object.assign(new Quest(), quest);
  }

  save() {
    console.log('Edit Quest:', this.editingQuest);

    if (this.editingQuest.id !== undefined) {
      this.apollo.mutate<EditQuestResponse>({
        mutation: EDIT_QUEST_MUTATION,

        variables: {
          id: this.editingQuest.id,
          input: {
            name: this.editingQuest.name,
            description: this.editingQuest.description
          }
        }
      }).subscribe(resp => {
        this.editingQuest = null;
      });
    } else {
      this.apollo.mutate<CreateQuestResponse>({
        mutation: CREATE_QUEST_MUTATION,

        variables: {
          campId: this.campaignId,
          input: {
            name: this.editingQuest.name,
            description: this.editingQuest.description
          }
        },

        update: (store, {data}) => {
          const storeData = store.readQuery<GetCampaignResponse>({query: GET_QUESTS_QUERY, variables: {id: this.campaignId}});

          storeData.getCampaign.quests.push(data.createQuest);

          store.writeQuery({query: GET_QUESTS_QUERY, variables: {id: this.campaignId}, data: storeData});
        }
      }).map(resp => resp.data.createQuest)
        .subscribe(quest => {
          this.editingQuest = null;
        });
    }
  }
}

export const GET_QUESTS_QUERY = gql`
  query GetQuests($id: ID!) {
    getCampaign(id: $id) {
      id
      quests {
        id
        name
        description
      }
    }
  }`;

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
