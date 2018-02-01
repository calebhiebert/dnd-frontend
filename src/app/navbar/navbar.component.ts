import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {NotificationService} from '../notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.isLoggedIn()
      .subscribe(isLoggedIn => this.auth.setLoginStatus(isLoggedIn));
  }

  get loggedIn() {
    return this.auth.loggedIn;
  }
}
