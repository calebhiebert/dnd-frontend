import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ModalModule, ProgressbarModule} from 'ngx-bootstrap';
import {SpinnerModule} from '../spinner/spinner.module';
import {SessionCharacterViewComponent} from './session-character-view/session-character-view.component';
import {SessionQuickeditFormComponent} from './session-quickedit-form/session-quickedit-form.component';
import {SessionViewComponent} from './session-view/session-view.component';
import {AttributesModule} from '../attributes/attributes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    SpinnerModule,
    AttributesModule,
    ProgressbarModule
  ],
  declarations: [SessionCharacterViewComponent, SessionQuickeditFormComponent, SessionViewComponent],
  exports: [SessionViewComponent]
})
export class SessionModule { }
