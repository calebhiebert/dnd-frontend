import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-character-selection-list',
  templateUrl: './character-selection-list.component.html',
  styleUrls: ['./character-selection-list.component.css']
})
export class CharacterSelectionListComponent implements OnInit {

  @Input()
  userId: number;

  constructor() { }

  ngOnInit() {
  }

}
