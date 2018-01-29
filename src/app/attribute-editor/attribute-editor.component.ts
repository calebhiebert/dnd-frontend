import {Component, Input, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Character} from '../types';

@Component({
  selector: 'app-attribute-editor',
  templateUrl: './attribute-editor.component.html',
  styleUrls: ['./attribute-editor.component.css']
})
export class AttributeEditorComponent implements OnInit {

  @Input()
  characterId: number;

  character: Character;

  loading = false;

  newAttr: any = {
    key: '',
    value: ''
  };

  showCreationBox = false;

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.apollo.query({
      query: gql`
        query AttributeEditorQuery($charId: Int!) {
          getCharacter(id: $charId) {
            id
            name
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
        charId: this.characterId
      }
    }).map((resp: any) => resp.data.getCharacter)
    .subscribe(character => {
      this.character = character;
      this.loading = false;
    });
  }
}
