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
}

export class Campaign {
  id: number;
  name: string;
  description: string;
  mine: boolean;
}
