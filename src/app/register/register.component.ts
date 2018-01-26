import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {TokenService} from "../token.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  loading: boolean = false;

  constructor(private auth: AuthService, private router: Router, private token: TokenService) { }

  ngOnInit() {
  }

  register() {
    this.loading = true;

    this.auth.register(this.username, this.password)
      .subscribe(res => {
        this.loading = false;
        this.token.save(res.data.register.token);
        this.router.navigate(['']);

      }, e => console.error);
  }
}
