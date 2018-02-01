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
  quests: Array<Quest>;
}

export class Attribute {
  id: number;
  dataType: string;
  key: string;
  sValue: string;
  nValue: number;
}

export class Quest {
  id: number;
  name: string;
  description: string;
  campaign: Campaign;
}

export interface GetCampaignResponse {
  getCampaign: Campaign;
}

export interface CreateQuestResponse {
  createQuest: Quest;
}

export interface EditQuestResponse {
  editQuest: Quest;
}

export interface DeleteQuestResponse {
  deleteQuest: Boolean;
}

export interface GetCharacterResponse {
  getCharacter: Character;
}

export interface CreateAttributeResponse {
  createAttribute: Attribute;
}

export interface CharacterCampaignOperationResponse {
  characterCampaignOperation: boolean;
}

export interface GetCampaignsResponse {
  getCampaigns: Campaign[];
}
