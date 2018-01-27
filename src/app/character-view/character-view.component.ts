import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CharacterService} from "../character.service";
import {Character} from "../types";

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.css']
})
export class CharacterViewComponent implements OnInit {

  character: Character;
  loading = false;

  constructor(private route: ActivatedRoute, private charService: CharacterService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadCharacter(+params['id']);
    });
  }

  loadCharacter(id: number) {
    this.loading = true;
    this.charService.getCharacter(id)
      .subscribe(resp => {
        this.character = resp.data.getCharacter;
        this.loading = false;
      });
  }
}
