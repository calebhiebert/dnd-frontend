import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  loading = false;

  error: any = null;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.error = null;

    this.loading = true;

    this.auth.login(this.username, this.password).toPromise()
      .then(login => {
        this.router.navigate(['home']);
        this.loading = false;
      }, err => {
        this.error = err;
        this.loading = false;
      });
  }
}
