import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Character} from '../../types';
import {CampaignService} from '../../services/campaign.service';

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

  constructor(private campService: CampaignService) {
  }

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.loading = true;

    this.campService.getCharactersThatCanJoin(this.campaignId)
    .then(characters => {
      this.loading = false;
      this.characters = characters;
    });
  }
}
