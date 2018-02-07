import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Character} from '../types';
import {Socket} from 'ng-socket-io';

const CHARACTER_FRAGMENT = gql`
  fragment CharacterFields on Character {
    id
    name
    description
    mine
    hp
    maxHp
    image
    imageUuid
  }`;

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

const GET_QUERY = gql`
  query GetCharacterView($id: ID!, $attributes: Boolean!, $campaign: Boolean!) {
    getCharacter(id: $id) {
      ...CharacterFields

      attributes @include(if: $attributes) {
        id
        key
        value
      }

      campaign @include(if: $campaign) {
        id
        name
      }
    }
  } ${CHARACTER_FRAGMENT}`;

@Injectable()
export class CharacterService {

  constructor(private apollo: Apollo, private socket: Socket) {
    socket.fromEvent('character-update')
      .subscribe(characterId => {
        apollo.query({
          query: GET_QUERY,
          variables: {id: characterId, attributes: true, campaign: true},
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

  get(id: string, {attributes = false, campaign = false}: { attributes?: boolean, campaign?: boolean } = {}) {
    this.socket.emit('sub', `character-update-${id}`);

    return this.apollo.watchQuery<GetCharacterResponse>({
      query: GET_QUERY,

      variables: {
        id,
        attributes,
        campaign
      }
    }).valueChanges.map(resp => resp.data.getCharacter);
  }

  create(character: Character) {
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

  edit(character: Character) {
    return this.apollo.mutate<EditCharacterResponse>({
      mutation: EDIT_CHARACTER_MUTATION,

      variables: {
        id: character.id,
        input: {
          name: character.name,
          description: character.description,
          hp: character.hp,
          maxHp: character.maxHp,
          image: character.image,
          imageUuid: character.imageUuid
        }
      }
    }).map(resp => resp.data.editCharacter).toPromise();
  }

  editHP(character: Character) {
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
