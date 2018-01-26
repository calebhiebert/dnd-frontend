import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  constructor() { }

  public save(token: string) {
    localStorage.setItem('auth-token', token);
  }

  public get() {
    return localStorage.getItem('auth-token');
  }
}
