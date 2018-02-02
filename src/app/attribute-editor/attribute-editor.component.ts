import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Character, CreateAttributeResponse, GetCharacterResponse} from '../types';
import * as terms from './dnd-terms.json';
import {Subscription} from 'rxjs/Subscription';

export const CHARACTER_ATTR_DATA_QUERY = gql`
  query AttributeEditorQuery($charId: ID!) {
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
export class AttributeEditorComponent implements OnInit, OnDestroy {

  @Input()
  characterId: string;

  @Output()
  doneEvent = new EventEmitter<boolean>();

  character: Character;

  dndKeys = terms.keys;
  dndValues = terms.values;

  loading = false;
  editorLoading = false;

  newAttr: any = {
    key: '',
    value: ''
  };

  showCreationBox = false;

  charSub: Subscription;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.charSub.unsubscribe();
  }

  loadData() {
    this.loading = true;

    this.charSub = this.apollo.watchQuery<GetCharacterResponse>({
      query: CHARACTER_ATTR_DATA_QUERY,

      variables: {
        charId: this.characterId
      }
    }).valueChanges.map(resp => resp.data.getCharacter)
    .subscribe(character => {
      this.character = character;
      this.loading = false;
    });
  }

  saveNewAttribute() {
    this.editorLoading = true;

    this.apollo.mutate<CreateAttributeResponse>({
      mutation: gql`
        mutation CreateAttribute($charId: ID!, $input: AttributeInput!) {
          createAttribute(characterId: $charId, input: $input) {
            id
            key
            dataType
            sValue
            nValue
          }
        }`,

      variables: {
        charId: this.characterId,
        input: this.newAttr
      },

      update: (store, {data: {createAttribute}}) => {
        const storeData: any = store.readQuery({query: CHARACTER_ATTR_DATA_QUERY, variables: {charId: this.characterId}});

        storeData.getCharacter.attributes.push(createAttribute);

        store.writeQuery({query: CHARACTER_ATTR_DATA_QUERY, variables: {charId: this.characterId}, data: storeData});
      }
    }).subscribe(resp => {
      this.newAttr = {
        key: '',
        value: ''
      };
      this.editorLoading = false;
      this.showCreationBox = false;
    });
  }

  done() {
    this.doneEvent.emit(true);
  }
}
