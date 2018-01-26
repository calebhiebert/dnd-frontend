export class User {
  id: number;
  username: string;
  characters: Array<any>;
  campaigns: Array<any>;
}

export class Character {
  id: number;
  name: string;
  description: string;

  constructor() {
    this.name = '';
    this.description = '';
  }
}
