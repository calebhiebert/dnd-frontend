import {Injectable} from '@angular/core';
import gql from 'graphql-tag';
import {CreateAttributeResponse, EditAttributeResponse} from '../types';
import {Apollo} from 'apollo-angular';

const CHARACTER_ATTR_DATA_QUERY = gql`
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

@Injectable()
export class AttributeService {

  constructor(private apollo: Apollo) {
  }

  edit(attribute: any, characterId: string) {
    return this.apollo.mutate<EditAttributeResponse>({
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
        id: attribute.id,
        input: {
          key: attribute.key,
          value: attribute.value
        }
      },

      update: (store, {data}) => {
        const storeData = store.readQuery({query: CHARACTER_ATTR_DATA_QUERY, variables: {charId: characterId}});

        (storeData as any).getCharacter.attributes.forEach((storeAttr: any) => {
          if (storeAttr.id === data.editAttribute.id) {
            Object.assign(storeAttr, data.editAttribute);
          }
        });

        store.writeQuery({query: CHARACTER_ATTR_DATA_QUERY, variables: {charId: characterId}, data: storeData});
      }
    }).map(resp => resp.data.editAttribute).toPromise();
  }

  delete(attributeId: string, characterId: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteAttribute($id: ID!) {
          deleteAttribute(id: $id)
        }
      `,

      variables: {
        id: attributeId
      },

      update: (store) => {
        const storeData: any = store.readQuery({query: CHARACTER_ATTR_DATA_QUERY, variables: {charId: characterId}});

        storeData.getCharacter.attributes = storeData.getCharacter.attributes
          .filter(attr => {
            return attr.id !== attributeId;
          });

        store.writeQuery({query: CHARACTER_ATTR_DATA_QUERY, variables: {charId: characterId}, data: storeData});
      }
    }).toPromise();
  }

  create(attribute: NewAttribute, characterId: string) {
    return this.apollo.mutate<CreateAttributeResponse>({
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
        charId: characterId,
        input: attribute
      },

      update: (store, {data: {createAttribute}}) => {
        const storeData: any = store.readQuery({query: CHARACTER_ATTR_DATA_QUERY, variables: {charId: characterId}});

        storeData.getCharacter.attributes.push(createAttribute);

        store.writeQuery({query: CHARACTER_ATTR_DATA_QUERY, variables: {charId: characterId}, data: storeData});
      }
    }).map(resp => resp.data.createAttribute).toPromise();
  }
}

export class NewAttribute {
  key: string;
  value: string;
}
