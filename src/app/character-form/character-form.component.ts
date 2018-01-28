import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Character} from '../types';
import {CharacterService} from '../character.service';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.css']
})
export class CharacterFormComponent implements OnInit {

  modalRef: BsModalRef;

  character: Character;

  loading = false;

  @Input()
  edit: boolean;

  @Input()
  editId: number;

  constructor(private modalService: BsModalService, private charService: CharacterService) {
  }

  ngOnInit() {
    this.character = new Character();

    if (this.edit) {
      this.loading = true;
      this.charService.getCharacter(this.editId)
        .subscribe(character => {
          Object.assign(this.character, character);
          this.loading = false;
        });
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  save() {
    this.loading = true;

    if ((this.edit || false) === false) {
      this.charService.createCharacter(this.character)
        .subscribe(() => {
          this.modalRef.hide();
          this.loading = false;
        }, e => console.log(e));
    } else {

      this.charService.editCharacter(this.character)
        .subscribe(() => {
          this.modalRef.hide();
          this.loading = false;
        }, console.error);
    }
  }

  get mode() {
    return this.edit ? 'Edit' : 'Create';
  }
}
