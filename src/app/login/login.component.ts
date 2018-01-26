import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../auth.service";
import {TokenService} from "../token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  loading: boolean = false;
  error: any = null;

  constructor(private auth: AuthService, private token: TokenService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.error = null;
    this.loading = true;
    this.auth.login(this.username, this.password)
      .subscribe(res => {
        this.loading = false;
        this.token.save(res.data.login.token);
        this.router.navigate(['']);
      }, err => {
        this.error = err;
      });
  }

  get isLoading() {
    return this.loading === true;
  }
}
