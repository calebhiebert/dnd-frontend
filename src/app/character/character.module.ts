import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharacterFormComponent} from './character-form/character-form.component';
import {CharacterSelectionListComponent} from '../campaign/character-selection-list/character-selection-list.component';
import {CharacterViewComponent} from './character-view/character-view.component';
import {IndexCharacterListComponent} from './index-character-list/index-character-list.component';
import {SpinnerModule} from '../spinner/spinner.module';
import {FormsModule} from '@angular/forms';
import {AlertModule, TooltipModule} from 'ngx-bootstrap';
import {AppRoutingModule} from '../app-routing.module';
import {AttributesModule} from '../attributes/attributes.module';

@NgModule({
  imports: [
    CommonModule,
    SpinnerModule,
    FormsModule,
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    AppRoutingModule,
    AttributesModule
  ],
  declarations: [
    CharacterFormComponent,
    CharacterViewComponent,
    IndexCharacterListComponent
  ],
  exports: [CharacterFormComponent, CharacterViewComponent, IndexCharacterListComponent]
})
export class CharacterModule {
}
