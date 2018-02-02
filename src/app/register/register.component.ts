import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {TokenService} from '../token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  loading = false;
  error: any = null;

  constructor(private auth: AuthService, private router: Router, private token: TokenService) {
  }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this.error = null;

    this.auth.register(this.username, this.password)
      .subscribe(register => {
        this.loading = false;
        TokenService.save(register.token);
        this.router.navigate(['home']);
        this.auth.setLoginStatus(true);

      }, e => {
        this.loading = false;
        this.error = e;
      });
  }
}
