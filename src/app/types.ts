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
  image: string;
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
  key: string;
  value: string;
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

export class AttributeGatherer {

  _attributes: Attribute[];
  _mappings: { name: string, matches: string[] }[];
  _result: {[key: string]: Attribute} = {};
  _allTerms: string[] = [];

  constructor(attributes: Attribute[], mappings: { name: string; matches: string[] }[]) {
    this._attributes = attributes;
    this._mappings = mappings;

    attributes.forEach(a => {
      mappings.forEach(m => {
        m.matches.forEach(mat => {
          this._allTerms.push(mat.trim().toLowerCase());

          if (a.key.trim().toLowerCase() === mat.trim().toLowerCase()) {
            this._result[m.name] = a;
          }
        });
      });
    });
  }

  get(key) {
    return (this._result[key] || null);
  }
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
