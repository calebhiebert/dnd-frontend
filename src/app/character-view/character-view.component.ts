import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CharacterService} from '../character.service';
import {Character, GetCharacterResponse} from '../types';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.css']
})
export class CharacterViewComponent implements OnInit, OnDestroy {

  character: Character;
  loading = false;
  attrModalRef: BsModalRef;

  chrSub: Subscription;
  routeSub: Subscription;

  constructor(private route: ActivatedRoute, private charService: CharacterService,
              private apollo: Apollo, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.loadCharacter(+params['id']);
    });
  }

  ngOnDestroy(): void {
    if (this.chrSub) {
      this.chrSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  openModal(template: TemplateRef<any>) {
    this.attrModalRef = this.modalService.show(template, {keyboard: false});
  }

  loadCharacter(id: number) {
    this.loading = true;

    this.chrSub = this.apollo.watchQuery<GetCharacterResponse>({
      query: gql`
        query GetCharacterView($id: ID!) {
          getCharacter(id: $id) {
            id
            name
            description
            mine
            attributes {
              id
              key
              dataType
              nValue
              sValue
            }
            campaign {
              id
              name
            }
          }
        }`,

      variables: {
        id
      }
    }).valueChanges
    .map(resp => resp.data.getCharacter)
    .subscribe(character => {
      this.character = character;
      this.loading = false;
    }, err => console.error('This is an error', err));
  }
}
