import {Component, OnDestroy, OnInit} from '@angular/core';
import {CharacterService} from '../character.service';
import {Character} from '../types';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-index-character-list',
  templateUrl: './index-character-list.component.html',
  styleUrls: ['./index-character-list.component.css']
})
export class IndexCharacterListComponent implements OnInit, OnDestroy {

  characters: Array<any>;
  loading = false;

  subscription: Subscription;

  constructor(private character: CharacterService, private router: Router) {
  }

  ngOnInit() {
    this.loadCharacters();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadCharacters() {
    this.loading = true;
    this.subscription = this.character.getMyCharacters()
      .subscribe(characters => {
        this.characters = characters;
        this.loading = false;
      });
  }

  selectCharacter(character: Character) {
    this.router.navigate(['character', character.id]);
  }
}
