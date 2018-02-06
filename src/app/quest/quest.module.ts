import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestEditorComponent} from './quest-editor/quest-editor.component';
import {QuestViewComponent} from './quest-view/quest-view.component';
import {SpinnerModule} from '../spinner/spinner.module';
import {FormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SpinnerModule,
    FormsModule,
    ModalModule
  ],
  declarations: [QuestEditorComponent, QuestViewComponent],
  exports: [QuestEditorComponent, QuestViewComponent]
})
export class QuestModule {
}
