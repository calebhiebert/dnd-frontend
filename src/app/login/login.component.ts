import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private toast: ToastrService) { }

  ngOnInit() {
  }

  login() {
    this.toast.info('Login Clicked', ':)', {
      closeButton: true,
      timeOut: 2500,
      progressBar: true
    });
  }

}
