import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Character} from './types';

const CHARACTER_FRAGMENT = gql`
  fragment CharacterFields on Character {
    id
    name
    description
    mine
  }
`;

const MY_CHARACTERS_QUERY = gql`
  query GetMyCharacters {
    me {
      characters {
        ...CharacterFields
      }
    }
  } ${CHARACTER_FRAGMENT}`;

const CREATE_CHARACTER_MUTATION = gql`
  mutation CreateCharacter($input: CharacterInput!) {
    createCharacter(input: $input) {
      ...CharacterFields
    }
  } ${CHARACTER_FRAGMENT}`;

const GET_CHARACTER_QUERY = gql`
  query GetCharacter($id: Int!) {
    getCharacter(id: $id) {
      ...CharacterFields
    }
  } ${CHARACTER_FRAGMENT}`;

const EDIT_CHARACTER_MUTATION = gql`
  mutation EditCharacter($id: ID!, $input: CharacterInput!) {
    editCharacter(id: $id, input: $input) {
      ...CharacterFields
    }
  } ${CHARACTER_FRAGMENT}`;

const USER_CHARACTERS_QUERY = gql`
  query UserCharacters($userId: Int!) {
    user(id: $userId) {
      characters {
        ...CharacterFields
      }
    }
  } ${CHARACTER_FRAGMENT}`;

@Injectable()
export class CharacterService {

  constructor(private apollo: Apollo) { }

  getMyCharacters() {
    return this.apollo.watchQuery<MyCharactersResponse>({
      query: MY_CHARACTERS_QUERY
    }).valueChanges;
  }

  getCharacter(id: number) {
    return this.apollo.watchQuery<GetCharacterResponse>({
      query: GET_CHARACTER_QUERY,

      variables: {
        id
      }
    }).valueChanges;
  }

  createCharacter(character: any) {
    return this.apollo.mutate<CreateCharacterResponse>({
      mutation: CREATE_CHARACTER_MUTATION,

      variables: {
        input: character
      },

      update(store, {data}) {
        const existingStuffs = store.readQuery<MyCharactersResponse>({query: MY_CHARACTERS_QUERY});

        existingStuffs.me.characters.push(data.createCharacter);

        store.writeQuery({query: MY_CHARACTERS_QUERY, data: existingStuffs});
      }
    });
  }

  editCharacter(character: Character) {
    return this.apollo.mutate<EditCharacterResponse>({
      mutation: EDIT_CHARACTER_MUTATION,

      variables: {
        id: character.id,
        input: {
          name: character.name,
          description: character.description
        }
      }
    });
  }

  getCharactersForUser(userId: number) {
    return this.apollo.mutate<>()
  }
}

interface MyCharactersResponse {
  me: {
    characters: Array<{
      id: number;
      name: string;
      descriptions: string;
    }>;
  };
}

interface CreateCharacterResponse {
  createCharacter: Character;
}

interface GetCharacterResponse {
  getCharacter: Character;
}

interface EditCharacterResponse {
  editCharacter: Character;
}

interface UserCharactersResponse {

}
