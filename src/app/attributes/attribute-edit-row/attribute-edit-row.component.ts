import {Component, Input, OnInit} from '@angular/core';
import {AttributeService} from '../../services/attribute.service';
import {Attribute} from '../../types';

@Component({
  selector: 'app-attribute-edit-row',
  templateUrl: './attribute-edit-row.component.html',
  styleUrls: ['./attribute-edit-row.component.css']
})
export class AttributeEditRowComponent implements OnInit {

  @Input()
  attribute: any;

  @Input()
  charId: any;

  attr: Attribute = {
    id: null,
    key: '',
    value: ''
  };

  loading = false;

  deleting = false;

  constructor(private attrService: AttributeService) {
  }

  ngOnInit() {
    this.attr.id = this.attribute.id;
    this.attr.key = this.attribute.key;
    this.attr.value = this.attribute.value;
  }

  save() {
    this.loading = true;

    this.attrService.edit(this.attr, this.charId)
      .then(() => this.loading = false)
      .catch(err => console.error(err));
  }

  delete() {
    this.deleting = true;
    this.attrService.delete(this.attribute.id, this.charId)
      .then(() => this.deleting = false)
      .catch(err => console.error(err));
  }
}
