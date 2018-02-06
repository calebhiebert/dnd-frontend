import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar.component';
import {NotificationModule} from '../notification/notification.module';
import {AppRoutingModule} from '../app-routing.module';
import {BsDropdownModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NotificationModule,
    AppRoutingModule,
    BsDropdownModule
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class NavbarModule {
}
