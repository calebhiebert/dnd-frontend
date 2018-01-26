import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Character} from "../types";
import {CharacterService} from "../character.service";

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.css']
})
export class CharacterFormComponent implements OnInit {

  modalRef: BsModalRef;
  character: Character;
  loading: boolean = false;

  @Input()
  edit: boolean;

  constructor(private modalService: BsModalService, private charService: CharacterService) { }

  ngOnInit() {
    this.character = new Character();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  save() {
    if((this.edit || false) === false) {
      this.charService.createCharacter(this.character)
        .subscribe(res => {
          this.modalRef.hide();
        }, e => console.log(e));
    }
  }
}
