import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Character} from '../../types';

@Component({
  selector: 'app-character-selection-list',
  templateUrl: './character-selection-list.component.html',
  styleUrls: ['./character-selection-list.component.css']
})
export class CharacterSelectionListComponent implements OnInit {

  @Output()
  selection = new EventEmitter<Character>();

  @Input()
  campaignId: string;

  characters: Array<Character>;
  loading = false;

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.loading = true;

    this.apollo.query({
      query: gql`
        query GetMyCharactersWithCampaigns($campaignId: ID!) {
          getCampaignJoinableCharacters(campaignId: $campaignId) {
            id
            name
          }
        }`,

      fetchPolicy: 'network-only',

      variables: {
        campaignId: this.campaignId
      }
    })
    .map((resp: any) => resp.data.getCampaignJoinableCharacters).toPromise()
    .then(characters => {
      this.loading = false;
      this.characters = characters;
    });
  }
}
