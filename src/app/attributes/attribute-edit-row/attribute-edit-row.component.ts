import {Component, Input, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {CHARACTER_ATTR_DATA_QUERY} from '../attribute-editor/attribute-editor.component';

@Component({
  selector: 'app-attribute-edit-row',
  templateUrl: './attribute-edit-row.component.html',
  styleUrls: ['./attribute-edit-row.component.css']
})
export class AttributeEditRowComponent implements OnInit {

  @Input()
  attribute: any;

  @Input()
  charId: any;

  attr: any = {
    id: 0,
    key: '',
    value: ''
  };

  loading = false;

  deleting = false;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.attr.id = this.attribute.id;
    this.attr.key = this.attribute.key;
    this.attr.value = (this.attribute.sValue || this.attribute.nValue);
  }

  save() {
    this.loading = true;

    this.apollo.mutate({
      mutation: gql`
        mutation EditAttribute($id: ID!, $input: AttributeInput!) {
          editAttribute(id: $id, input: $input) {
            id
            key
            dataType
            nValue
            sValue
          }
        }`,

      variables: {
        id: this.attr.id,
        input: {
          key: this.attr.key,
          value: this.attr.value
        }
      },

      update: (store, {data}) => {
        const storeData = store.readQuery({query: CHARACTER_ATTR_DATA_QUERY, variables: {charId: this.charId}});

        (storeData as any).getCharacter.attributes.forEach((storeAttr: any) => {
          if (storeAttr.id === data.editAttribute.id) {
            Object.assign(storeAttr, data.editAttribute);
          }
        });

        store.writeQuery({query: CHARACTER_ATTR_DATA_QUERY, variables: {charId: this.charId}, data: storeData});
      }
    }).map((resp: any) => resp.data.editAttribute)
    .subscribe(() => this.loading = false);
  }

  delete() {
    this.deleting = true;

    this.apollo.mutate({
      mutation: gql`
        mutation DeleteAttribute($id: ID!) {
          deleteAttribute(id: $id)
        }
      `,

      variables: {
        id: this.attribute.id
      },

      update: (store, {data: {deleteAttribute}}) => {
        const storeData: any = store.readQuery({query: CHARACTER_ATTR_DATA_QUERY, variables: {charId: this.charId}});

        storeData.getCharacter.attributes = storeData.getCharacter.attributes
          .filter(attr => {
            return attr.id !== this.attribute.id;
          });

        store.writeQuery({query: CHARACTER_ATTR_DATA_QUERY, variables: {charId: this.charId}, data: storeData});
      }
    }).subscribe(() => {
      this.deleting = false;
    });
  }
}
