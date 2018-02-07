import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Character} from '../../types';
import {CharacterService} from '../../services/character.service';
import {Subscription} from 'rxjs/Subscription';
import * as uploadcare from 'uploadcare-widget';
import {ErrorService} from '../../services/error.service';

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

  fileWidget;

  constructor(private charService: CharacterService, private errService: ErrorService) {
  }

  ngOnInit() {
    this.character = new Character();

    if (this.edit) {
      this.loading = true;
      this.sub = this.charService.get(this.editId)
        .subscribe(character => {
          Object.assign(this.character, character);
          this.loading = false;
        });
    }
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
    this.imageUploader.nativeElement.value = (this.character.imageUuid || '' );

    this.fileWidget = uploadcare.SingleWidget(this.imageUploader.nativeElement);

    this.fileWidget.onUploadComplete(info => {
      this.character.image = info.cdnUrl;
      this.character.imageUuid = info.uuid;
    });
  }

  hide() {

  }

  removeImage() {
    this.character.image = null;
    this.character.imageUuid = null;
    this.fileWidget.value(null);
  }

  save() {
    this.loading = true;

    if ((this.edit || false) === false) {
      this.charService.create(this.character)
        .then(() => {
          this.hide();
          this.loading = false;
        })
        .catch(err => {
          this.errService.error(err);
        });
    } else {

      this.charService.edit(this.character)
        .then(() => {
          this.hide();
          this.loading = false;
        })
        .catch(err => {
          this.errService.error(err);
        });
    }
  }

  get mode() {
    return this.edit ? 'Edit' : 'Create';
  }
}
