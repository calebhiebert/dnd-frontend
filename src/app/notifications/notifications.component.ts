import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Campaign, Character} from '../types';
import {NotificationService} from '../notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: Array<JoinRequestNotification>;
  loading = false;

  constructor(private notifService: NotificationService) { }

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.loading = true;

    this.notifService.loadNotifications()
    .subscribe(notifications => {
      this.notifications = notifications;
      this.loading = false;
    });
  }
}

interface JoinRequestNotification {
  id: number;
  status: string;
  campaign: Campaign;
  character: Character;
}
