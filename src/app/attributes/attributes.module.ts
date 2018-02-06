import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AttributeEditRowComponent} from './attribute-edit-row/attribute-edit-row.component';
import {AttributeEditorComponent} from './attribute-editor/attribute-editor.component';
import {FormsModule} from '@angular/forms';
import {SpinnerModule} from '../spinner/spinner.module';
import {TypeaheadModule} from 'ngx-bootstrap';
import {AttributePipe} from './attribute.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SpinnerModule,
    TypeaheadModule
  ],
  declarations: [AttributeEditRowComponent, AttributeEditorComponent, AttributePipe],
  exports: [AttributeEditRowComponent, AttributeEditorComponent, AttributePipe]
})
export class AttributesModule { }
