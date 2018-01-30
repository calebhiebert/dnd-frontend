import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../notification.service';

@Component({
  selector: 'app-notification-bubble',
  templateUrl: './notification-bubble.component.html',
  styleUrls: ['./notification-bubble.component.css']
})
export class NotificationBubbleComponent implements OnInit {

  notificationCount: (string | number) = '?';

  constructor(private notifService: NotificationService) { }

  ngOnInit() {
    this.loadNotificationCount();
  }

  loadNotificationCount() {
    this.notifService.loadNotifications()
      .subscribe(notifications => this.notificationCount = notifications.length);
  }
}
