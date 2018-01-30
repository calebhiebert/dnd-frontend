import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CharacterService} from '../character.service';
import {Character} from '../types';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.css']
})
export class CharacterViewComponent implements OnInit {

  character: Character;
  loading = false;

  constructor(private route: ActivatedRoute, private charService: CharacterService, private apollo: Apollo) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadCharacter(+params['id']);
    });
  }

  loadCharacter(id: number) {
    this.loading = true;

    this.apollo.watchQuery({
      query: gql`
        query GetCharacterView($id: Int!) {
          getCharacter(id: $id) {
            id
            name
            description
            mine
            attributes {
              id
              key
              dataType
              nValue
              sValue
            }
          }
        }`,

      variables: {
        id
      }
    }).valueChanges
    .map((resp: any) => resp.data.getCharacter)
    .subscribe(character => {
      this.character = character;
      this.loading = false;
    });
  }
}
