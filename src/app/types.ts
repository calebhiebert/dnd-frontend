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
  campaign: Campaign;
  creator: User;
  attributes: Array<Attribute>;
}

export class Campaign {
  id: number;
  name: string;
  description: string;
  mine: boolean;
  characters: Array<Character>;
  creator: User;
}

export class Attribute {
  id: number;
  dataType: string;
  key: string;
  sValue: string;
  nValue: number;
}
