import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Character} from '../../types';
import * as terms from './dnd-terms.json';
import {Subscription} from 'rxjs/Subscription';
import {AttributeService, NewAttribute} from '../../services/attribute.service';
import {CharacterService} from '../../services/character.service';

@Component({
  selector: 'app-attribute-editor',
  templateUrl: './attribute-editor.component.html',
  styleUrls: ['./attribute-editor.component.css']
})
export class AttributeEditorComponent implements OnInit, OnDestroy {

  @Input()
  characterId: string;

  @Output()
  doneEvent = new EventEmitter<boolean>();

  character: Character;

  dndKeys = terms.keys;
  dndValues = terms.values;

  loading = false;
  editorLoading = false;

  newAttr: NewAttribute = {
    key: '',
    value: ''
  };

  showCreationBox = false;

  charSub: Subscription;

  constructor(private charService: CharacterService, private attrService: AttributeService) {
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.charSub) {
      this.charSub.unsubscribe();
    }
  }

  loadData() {
    this.loading = true;

    this.charSub = this.charService.get(this.characterId, {attributes: true})
      .subscribe(character => {
        this.character = character;
        this.loading = false;
      });
  }

  saveNewAttribute() {
    this.editorLoading = true;

    this.attrService.create(this.newAttr, this.characterId)
      .then(() => {
        this.newAttr = new NewAttribute();

        this.editorLoading = false;
        this.showCreationBox = false;
      });
  }

  done() {
    this.doneEvent.emit(true);
  }
}
