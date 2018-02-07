export class User {
  id: string;
  username: string;
  characters: Array<any>;
  campaigns: Array<any>;
}

export class Character {
  id: string;
  name: string;
  description: string;
  campaign: Campaign;
  creator: User;
  hp: number;
  maxHp: number;
  mine: boolean;
  attributes: Array<Attribute>;
}

export class Campaign {
  id: string;
  name: string;
  description: string;
  mine: boolean;
  characters: Array<Character>;
  creator: User;
  quests: Array<Quest>;
  session: Session;
  joinRequests: any[];
  sessions: Session[];
}

export class Attribute {
  id: string;
  dataType: string;
  key: string;
  sValue: string;
  nValue: number;
}

export class JoinRequest {
  // TODO fill out
}

export class Quest {
  id: string;
  name: string;
  description: string;
  campaign: Campaign;
}

export class Session {
  id: string;
  notes: string;
  createdAt: string;
  finishedAt: string;
  campaign: Campaign;
  status: string;
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

export interface EditAttributeResponse {
  editAttribute: Attribute;
}

export interface CharacterCampaignOperationResponse {
  characterCampaignOperation: boolean;
}

export interface GetCampaignsResponse {
  getCampaigns: Campaign[];
}

export interface MeResponse {
  me: User;
}

export interface CreateSessionResponse {
  createSession: Session;
}

export interface FinishSessionResponse {
  finishSession: Session;
}
