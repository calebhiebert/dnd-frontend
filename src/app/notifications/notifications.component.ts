import {Component, OnDestroy, OnInit} from '@angular/core';
import {Campaign, Character} from '../types';
import {NotificationService} from '../notification.service';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  notifications: Array<JoinRequestNotification>;
  loading = false;

  sub: Subscription;

  constructor(private notifService: NotificationService) {
  }

  ngOnInit() {
    this.loadNotifications();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  loadNotifications() {
    this.loading = true;

    this.sub = this.notifService.loadNotifications()
      .subscribe(notifications => {
        this.notifications = notifications;
        this.loading = false;
      });
  }
}

interface JoinRequestNotification {
  id: string;
  status: string;
  campaign: Campaign;
  character: Character;
}
