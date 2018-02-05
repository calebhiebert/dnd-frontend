import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SessionService} from '../session.service';
import {CharacterService} from '../character.service';
import {Character} from '../types';

@Component({
  selector: 'app-session-quickedit-form',
  templateUrl: './session-quickedit-form.component.html',
  styleUrls: ['./session-quickedit-form.component.css']
})
export class SessionQuickeditFormComponent implements OnInit, AfterViewInit {

  @Input()
  characterId: string;

  @Output()
  done = new EventEmitter<any>();

  hpOperator = '';

  @ViewChild('hpoperation')
  hpOperation: ElementRef;

  character: Character;
  originalCharacterHp: number;

  loading = false;

  constructor(private sessionService: SessionService, private charService: CharacterService) {
  }

  ngOnInit() {
    this.character = new Character();
    this.loadCharacter();
  }

  ngAfterViewInit() {
    const el = this.hpOperation.nativeElement;
    el.focus();
  }

  loadCharacter() {
    this.loading = true;

    this.sessionService.getSessionCharacter(this.characterId)
      .then(character => {
        Object.assign(this.character, character);
        this.originalCharacterHp = character.hp;
        this.loading = false;
      });
  }

  saveHp() {
    this.charService.editCharacterHp(this.character)
      .then(character => {
        this.done.emit();
      });
  }

  parseHpOperator() {
    const operator = this.hpOperator[0];
    const number = isNaN(Number(operator)) ? Number(this.hpOperator.substring(1)) : Number(this.hpOperator);

    if (!isNaN(number)) {
      switch (operator) {
        case '+':
          this.character.hp = this.originalCharacterHp + number;
          break;
        case '-':
          this.character.hp = this.originalCharacterHp - number;
          break;
        default:
          this.character.hp = number;
          break;
      }
    }
  }
}
