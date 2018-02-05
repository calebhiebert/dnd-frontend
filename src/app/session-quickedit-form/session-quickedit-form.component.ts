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

  @ViewChild('hpinput')
  hpInputRef: ElementRef;

  character: Character;
  loading = false;

  constructor(private sessionService: SessionService, private charService: CharacterService) {
  }

  ngOnInit() {
    this.character = new Character();
    this.loadCharacter();
  }

  ngAfterViewInit() {
    const el = this.hpInputRef.nativeElement;
    el.focus();
  }

  loadCharacter() {
    this.loading = true;

    this.sessionService.getSessionCharacter(this.characterId)
      .then(character => {
        Object.assign(this.character, character);
        this.loading = false;
      });
  }

  saveHp() {
    this.charService.editCharacterHp(this.character)
      .then(character => {
        this.done.emit();
      });
  }
}
