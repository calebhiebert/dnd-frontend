import {Injectable} from '@angular/core';
import {Campaign, Character, MeResponse} from './types';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import {Socket} from 'ng-socket-io';

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

const NEW_NOTIFICATION_REFETCH_QUERY = gql`
  query NewNotificationRefetchQuery {
    me {
      campaigns {
        id
        name
        joinRequests(status: [WAITING]) {
          id
          status
          character {
            id
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

  constructor(private apollo: Apollo, private socket: Socket) {
    this.socket.fromEvent('new-notification')
      .subscribe(() => {
        this.apollo.query({
          query: NEW_NOTIFICATION_REFETCH_QUERY,

          fetchPolicy: 'network-only'
        }).toPromise().then(notifs => {
          console.log('Updated notifications', notifs);
        });
      });
  }

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
  id: string;
  status: string;
  campaign: Campaign;
  character: Character;
}
