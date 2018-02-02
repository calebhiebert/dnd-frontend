import { Injectable } from '@angular/core';
import {Campaign, Character, MeResponse} from './types';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';

const NOTIFICATION_QUERY = gql`
  query NotificationQuery {
    me {
      campaigns {
        id
        name
        joinRequests(status: [WAITING]) {
          id
          status
          character {
            name
            creator {
              username
            }
          }
        }
      }
    }
  }`;

@Injectable()
export class NotificationService {

  constructor(private apollo: Apollo) { }

  loadNotifications() {
    return this.apollo.watchQuery<MeResponse>({
      query: NOTIFICATION_QUERY
    }).valueChanges
    .map(resp => resp.data.me.campaigns)
    .map(campaigns => {
      const notifs = [];

      campaigns.forEach(campaign => {
        campaign.joinRequests.forEach(request => {
          notifs.push({
            id: request.id,
            status: request.status,
            campaign: {
              id: campaign.id,
              name: campaign.name
            },
            character: request.character
          });
        });
      });

      return notifs;
    });
  }
}

export interface JoinRequestNotification {
  id: number;
  status: string;
  campaign: Campaign;
  character: Character;
}
