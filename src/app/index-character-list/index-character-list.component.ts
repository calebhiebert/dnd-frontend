import {Component, OnInit} from '@angular/core';
import {CharacterService} from '../character.service';
import {Character} from '../types';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index-character-list',
  templateUrl: './index-character-list.component.html',
  styleUrls: ['./index-character-list.component.css']
})
export class IndexCharacterListComponent implements OnInit {

  characters: Array<any>;
  loading = false;

  constructor(private character: CharacterService, private router: Router) {
  }

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.loading = true;
    this.character.getMyCharacters()
      .subscribe(characters => {
        this.characters = characters;
        this.loading = false;
      });
  }

  selectCharacter(character: Character) {
    this.router.navigate(['character', character.id]);
  }
}
