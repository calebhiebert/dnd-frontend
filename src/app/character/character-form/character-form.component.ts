import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Character} from '../../types';
import {CharacterService} from '../../services/character.service';
import {Subscription} from 'rxjs/Subscription';
import * as uploadcare from 'uploadcare-widget';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.css']
})
export class CharacterFormComponent implements OnInit, OnDestroy, AfterViewInit {

  character: Character;

  loading = false;

  @Input()
  edit: boolean;

  @Input()
  editId: string;

  @ViewChild('imageupload')
  imageUploader: ElementRef;

  sub: Subscription;

  constructor(private charService: CharacterService) {
  }

  ngOnInit() {
    this.character = new Character();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.init();
  }

  init() {
    if (this.edit) {
      this.loading = true;
      this.sub = this.charService.get(this.editId)
        .subscribe(character => {
          Object.assign(this.character, character);
          this.loading = false;
        });
    }

    this.imageUploader.nativeElement.value = this.character.image;

    const fileWidget = uploadcare.SingleWidget(this.imageUploader.nativeElement);

    fileWidget.onChange(file => {
      console.log(file);
    });

    fileWidget.onUploadComplete(info => {
      console.log(info);
      this.character.image = info.uuid;
    });
  }

  hide() {

  }

  save() {
    this.loading = true;

    if ((this.edit || false) === false) {
      this.charService.create(this.character)
        .then(() => {
          this.hide();
          this.loading = false;
        }, e => console.log(e));
    } else {

      this.charService.edit(this.character)
        .then(() => {
          this.hide();
          this.loading = false;
        }, console.error);
    }
  }

  get mode() {
    return this.edit ? 'Edit' : 'Create';
  }
}
