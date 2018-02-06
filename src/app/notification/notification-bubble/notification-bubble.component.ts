import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-notification-bubble',
  templateUrl: './notification-bubble.component.html',
  styleUrls: ['./notification-bubble.component.css']
})
export class NotificationBubbleComponent implements OnInit, OnDestroy {

  notificationCount: (string | number) = '?';

  sub: Subscription;

  constructor(private notifService: NotificationService) { }

  ngOnInit() {
    this.loadNotificationCount();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  loadNotificationCount() {
    this.sub = this.notifService.loadNotifications()
      .subscribe(notifications => {
        this.notificationCount = notifications.length;
      });
  }
}
