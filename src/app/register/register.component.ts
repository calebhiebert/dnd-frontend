import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

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

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this.error = null;

    this.auth.register(this.username, this.password).toPromise()
      .then(register => {
        this.loading = false;
        this.router.navigate(['home']);

      }, e => {
        this.loading = false;
        this.error = e;
      });
  }
}
