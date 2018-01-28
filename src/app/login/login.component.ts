import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../auth.service';
import {TokenService} from '../token.service';
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

  constructor(private auth: AuthService, private token: TokenService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.error = null;

    this.loading = true;

    this.auth.login(this.username, this.password)
      .subscribe(login => {
        this.auth.setLoginStatus(true);
        this.router.navigate(['']);
        TokenService.save(login.token);
        this.loading = false;
      }, err => {
        this.error = err;
        this.auth.setLoginStatus(false);
      });
  }
}
