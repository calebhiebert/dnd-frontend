import { Injectable } from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {Character} from "./types";

const MY_CHARACTERS_QUERY = gql`
  query GetMyCharacters {
    me {
      characters {
        id
        name
        description
      }
    }
  }`;

const CREATE_CHARACTER_MUTATION = gql`
  mutation CreateCharacter($input: CharacterInput!) {
    createCharacter(input: $input) {
      id
      name
      description
    }
  }`;

const GET_CHARACTER_QUERY = gql`
  query GetCharacter($id: Int!) {
    getCharacter(id: $id) {
      id
      name
      description
    }
  }
`;

@Injectable()
export class CharacterService {

  constructor(private apollo: Apollo) { }

  getMyCharacters() {
    return this.apollo.watchQuery<MyCharactersResponse>({
      query: MY_CHARACTERS_QUERY
    }).valueChanges;
  }

  getCharacter(id: number) {
    return this.apollo.query<GetCharacterResponse>({
      query: GET_CHARACTER_QUERY,

      variables: {
        id
      }
    });
  }

  createCharacter(character: Character) {
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
}

type MyCharactersResponse = {
  me: {
    characters: Array<{
      id: number;
      name: string;
      descriptions: string;
    }>;
  }
}

type CreateCharacterResponse = {
  createCharacter: Character;
}

type GetCharacterResponse = {
  getCharacter: Character;
}
