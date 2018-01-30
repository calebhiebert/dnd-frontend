import {Component, Input, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Character} from '../types';

export const DATA_QUERY = gql`
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
  }`;

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
  editorLoading = false;

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

    this.apollo.watchQuery({
      query: DATA_QUERY,

      variables: {
        charId: this.characterId
      }
    }).valueChanges.map((resp: any) => resp.data.getCharacter)
    .subscribe(character => {
      this.character = character;
      this.loading = false;
    });
  }
}
