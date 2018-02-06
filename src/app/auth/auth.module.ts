import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule} from '@angular/forms';
import {SpinnerModule} from '../spinner/spinner.module';
import {AlertModule} from 'ngx-bootstrap';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SpinnerModule,
    AlertModule,
    AppRoutingModule
  ],
  declarations: [LoginComponent, LogoutComponent, RegisterComponent],
  exports: [LoginComponent, LogoutComponent, RegisterComponent],
})
export class AuthModule { }
