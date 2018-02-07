import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar.component';
import {NotificationModule} from '../notification/notification.module';
import {AppRoutingModule} from '../app-routing.module';
import {BsDropdownModule} from 'ngx-bootstrap';
import {ServicesModule} from '../services/services.module';

@NgModule({
  imports: [
    CommonModule,
    NotificationModule,
    AppRoutingModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class NavbarModule {
}
