import { Injectable } from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {User} from "./types";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

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

  loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedIn: boolean = false;

  constructor(private apollo: Apollo) { }

  public login(username: string, password: string) {
    return this.apollo.mutate<LoginResponse>({
      mutation: LOGIN_MUTATION,

      variables: {
        username, password
      }
    });
  }

  public register(username: string, password: string) {
    return this.apollo.mutate<RegisterResponse>({
      mutation: REGISTER_MUTATION,

      variables: {
        username, password
      }
    });
  }

  public logout() {
    return this.apollo.mutate({
      mutation: LOGOUT_MUTATION
    });
  }

  public isLoggedIn() {
    return this.apollo.query<IsLoggedInResponse>({
      query: IS_LOGGED_IN_QUERY,

      fetchPolicy: 'network-only'
    });
  }

  public setLoginStatus(loggedIn: boolean) {
    this.loggedIn = loggedIn;
    this.loggedIn$.next(loggedIn);
  }
}

type IsLoggedInResponse = {
  isLoggedIn: boolean;
};

type LoginResponse = {
  login: {
    token: string;
    user: any;
  }
};

type RegisterResponse = {
  register: {
    token: string;
    user: any;
  }
}
