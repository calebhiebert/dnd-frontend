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
        .subscribe(resp => {
          Object.assign(this.character, resp.data.getCharacter);
          this.loading = false;
        });
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  save() {
    if ((this.edit || false) === false) {
      this.charService.createCharacter(this.character)
        .subscribe(res => {
          this.modalRef.hide();
        }, e => console.log(e));
    } else {

      this.charService.editCharacter(this.character)
        .subscribe(() => {
          this.modalRef.hide();
        }, console.error);
    }
  }

  get mode() {
    return this.edit ? 'Edit' : 'Create';
  }
}
