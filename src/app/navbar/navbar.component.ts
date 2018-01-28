import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {NotificationService} from '../notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  notificationCount: (string | number) = '?';

  constructor(private auth: AuthService, private notifService: NotificationService) {
  }

  ngOnInit() {
    this.loadNotificationCount();
  }

  loadNotificationCount() {
    this.notifService.loadNotifications()
      .subscribe(notifications => this.notificationCount = notifications.length);
  }

  get loggedIn() {
    return this.auth.loggedIn;
  }
}
