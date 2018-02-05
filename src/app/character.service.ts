import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Character} from './types';
import {Socket} from 'ng-socket-io';

const CHARACTER_FRAGMENT = gql`
  fragment CharacterFields on Character {
    id
    name
    description
    mine
    hp
    maxHp
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
  query GetCharacter($id: ID!) {
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

const MOD_HP_MUTATION = gql`
  mutation ModHp($id: ID!, $input: HPInput!) {
    modCharacterHp(id: $id, input: $input) {
      ...CharacterFields
    }
  } ${CHARACTER_FRAGMENT}`;

const USER_CHARACTERS_QUERY = gql`
  query UserCharacters($userId: ID!) {
    user(id: $userId) {
      characters {
        ...CharacterFields
      }
    }
  } ${CHARACTER_FRAGMENT}`;

const CHARACTER_VIEW_QUERY = gql`
  query GetCharacterView($id: ID!) {
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
      campaign {
        id
        name
      }
    }
  }`;

@Injectable()
export class CharacterService {

  constructor(private apollo: Apollo, private socket: Socket) {
    socket.fromEvent('character-update')
      .subscribe(characterId => {
        apollo.query({
          query: CHARACTER_VIEW_QUERY,
          variables: {id: characterId},
          fetchPolicy: 'network-only'
        }).toPromise().then(resp => {
        });
      });
  }

  getMyCharacters() {
    return this.apollo.watchQuery<MyCharactersResponse>({
      query: MY_CHARACTERS_QUERY
    }).valueChanges.map(resp => resp.data.me.characters);
  }

  getCharacterForView(id: string) {
    this.apollo.watchQuery<GetCharacterResponse>({
      query: CHARACTER_VIEW_QUERY,

      variables: {
        id
      }
    }).valueChanges
      .map(resp => resp.data.getCharacter);
  }

  getCharacter(id: string) {
    this.socket.emit('sub', `character-update-${id}`);

    return this.apollo.watchQuery<GetCharacterResponse>({
      query: GET_CHARACTER_QUERY,

      variables: {
        id
      }
    }).valueChanges.map(resp => resp.data.getCharacter);
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
    }).map(resp => resp.data.createCharacter)
      .toPromise();
  }

  editCharacter(character: Character) {
    return this.apollo.mutate<EditCharacterResponse>({
      mutation: EDIT_CHARACTER_MUTATION,

      variables: {
        id: character.id,
        input: {
          name: character.name,
          description: character.description,
          hp: character.hp,
          maxHp: character.maxHp
        }
      }
    }).map(resp => resp.data.editCharacter).toPromise();
  }

  editCharacterHp(character: Character) {
    return this.apollo.mutate<ModHpResponse>({
      mutation: MOD_HP_MUTATION,

      variables: {
        id: character.id,
        input: {
          hp: character.hp,
          maxHp: character.maxHp
        }
      }
    }).map(resp => resp.data.modCharacterHp).toPromise();
  }

  getCharactersForUser(userId: string) {
    return this.apollo.query<UserCharactersResponse>({
      query: USER_CHARACTERS_QUERY,

      variables: {
        userId: userId
      }
    }).map(resp => resp.data.user.characters);
  }
}

interface MyCharactersResponse {
  me: {
    characters: Array<Character>;
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
  user: {
    characters: Array<Character>
  };
}

interface ModHpResponse {
  modCharacterHp: Character;
}
