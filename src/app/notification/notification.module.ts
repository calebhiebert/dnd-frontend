import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotificationsComponent} from './notifications/notifications.component';
import {NotificationBubbleComponent} from './notification-bubble/notification-bubble.component';
import {AppRoutingModule} from '../app-routing.module';
import {PopoverModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    PopoverModule
  ],
  declarations: [NotificationsComponent, NotificationBubbleComponent],
  exports: [NotificationBubbleComponent]
})
export class NotificationModule { }
