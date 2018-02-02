import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private apollo: Apollo) {
  }

  ngOnInit() {
    this.auth.logout().toPromise()
      .then(() => {
        this.apollo.getClient().resetStore();
        this.router.navigate(['']);
      });
  }
}
