import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {SocketService} from './socket.service';
import {Socket} from 'ng-socket-io';

const LOGIN_MUTATION = gql`
  mutation LogIn($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }`;

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      token
    }
  }`;

const LOGOUT_MUTATION = gql`
  mutation LogOut {
    logout
  }
`;

const IS_LOGGED_IN_QUERY = gql`
  query IsLoggedIn {
    isLoggedIn
  }`;

@Injectable()
export class AuthService {

  _loggedIn = false;
  private _token = '';

  set loggedIn(loggedIn: boolean) {
    this._loggedIn = loggedIn;
  }

  get loggedIn() {
    return this._loggedIn;
  }

  set token(value: string) {
    this.socket.supplyToken(value);

    if (value.trim() !== '') {
      localStorage.setItem('auth-token', value);
    } else {
      localStorage.removeItem('auth-token');
    }

    this._token = value;
  }

  constructor(private apollo: Apollo, private socket: SocketService,
              private skt: Socket) {
  }

  public login(username: string, password: string) {
    return this.apollo.mutate<LoginResponse>({
      mutation: LOGIN_MUTATION,

      variables: {
        username, password
      }
    })
      .map(resp => resp.data.login)
      .map(login => {
        this.loggedIn = true;
        this.token = login.token;
        return login;
      });
  }

  public register(username: string, password: string) {
    return this.apollo.mutate<RegisterResponse>({
      mutation: REGISTER_MUTATION,

      variables: {
        username, password
      }
    }).map(resp => resp.data.register)
      .map(register => {
        this.loggedIn = true;
        this.token = register.token;
        return register;
      });
  }

  public logout() {
    return this.apollo.mutate({
      mutation: LOGOUT_MUTATION
    }).map(resp => resp.data.logout)
      .map(logout => {
        this.loggedIn = false;
        this.token = '';
        return logout;
      });
  }

  public isLoggedIn() {
    return this.apollo.query<IsLoggedInResponse>({
      query: IS_LOGGED_IN_QUERY,

      fetchPolicy: 'network-only'
    })
      .map(resp => resp.data.isLoggedIn)
      .map(isLoggedIn => {
        this.loggedIn = isLoggedIn;
        return isLoggedIn;
      });
  }
}

interface IsLoggedInResponse {
  isLoggedIn: boolean;
}

interface LoginResponse {
  login: {
    token: string;
    user: any;
  };
}

interface RegisterResponse {
  register: {
    token: string;
    user: any;
  };
}
