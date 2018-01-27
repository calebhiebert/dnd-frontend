import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  constructor() { }

  public static save(token: string) {
    localStorage.setItem('auth-token', token);
  }

  public static get() {
    return localStorage.getItem('auth-token');
  }
}
