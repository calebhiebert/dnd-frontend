import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../types';
import {CharacterService} from '../character.service';

@Component({
  selector: 'app-character-selection-list',
  templateUrl: './character-selection-list.component.html',
  styleUrls: ['./character-selection-list.component.css']
})
export class CharacterSelectionListComponent implements OnInit {

  @Input()
  userId: number;

  characters: Array<Character>;
  loading = false;

  constructor(private charService: CharacterService) { }

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.loading = true;

    this.charService.getCharactersForUser(this.userId)
      .subscribe(characters => {
        this.loading = false;
        this.characters = characters;
      });
  }
}
