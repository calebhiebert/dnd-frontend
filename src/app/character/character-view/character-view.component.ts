import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CharacterService} from '../../services/character.service';
import {Attribute, AttributeGatherer, Character} from '../../types';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Subscription} from 'rxjs/Subscription';

const ATTR_MAPPINGS = [
  {name: 'ac', matches: ['ac', 'armor class', 'armour class']},
  {name: 'init', matches: ['initiative', 'init']},
  {name: 'speed', matches: ['speed']},
  {name: 'strength', matches: ['str', 'strength']},
  {name: 'dexterity', matches: ['dex', 'dexterity']},
  {name: 'constitution', matches: ['con', 'constitution', 'const']},
  {name: 'intelligence', matches: ['intelligence', 'int']},
  {name: 'wisdom', matches: ['wis', 'wisdom']},
  {name: 'charisma', matches: ['cha', 'charisma']},
  {name: 'acrobatics', matches: ['acrobatics', 'acro']},
  {name: 'animal handling', matches: ['animal handling']},
  {name: 'arcana', matches: ['arcana']},
  {name: 'athletics', matches: ['athletics']},
  {name: 'deception', matches: ['deception']},
  {name: 'history', matches: ['history']},
  {name: 'insight', matches: ['insight']},
  {name: 'intimidation', matches: ['intimidation']},
  {name: 'investigation', matches: ['investigation']},
  {name: 'medicine', matches: ['medicine']},
  {name: 'nature', matches: ['nature']},
  {name: 'perception', matches: ['perception']},
  {name: 'performance', matches: ['performance']},
  {name: 'persuasion', matches: ['persuasion']},
  {name: 'religion', matches: ['religion']},
  {name: 'sleight of hand', matches: ['sleight of hand', 'soh']},
  {name: 'stealth', matches: ['stealth']},
  {name: 'survival', matches: ['survival']},
];

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.css']
})
export class CharacterViewComponent implements OnInit, OnDestroy {

  character: Character;
  loading = false;
  attrModalRef: BsModalRef;
  chrModalRef: BsModalRef;

  chrSub: Subscription;
  routeSub: Subscription;

  attributeGatherer: AttributeGatherer;

  constructor(private route: ActivatedRoute, private charService: CharacterService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.loadCharacter(params['id']);
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

  openChrModal(template: TemplateRef<any>) {
    this.chrModalRef = this.modalService.show(template);
  }

  loadCharacter(id: string) {
    this.loading = true;

    this.chrSub = this.charService.get(id, {attributes: true, campaign: true})
      .subscribe(character => {
        this.character = character;
        this.loading = false;

        this.attributeGatherer = new AttributeGatherer(this.character.attributes, ATTR_MAPPINGS);
      });
  }

  isReservedAttr(attr: string) {
    return this.attributeGatherer._allTerms.indexOf(attr.trim().toLowerCase()) !== -1;
  }

  get nonReservedAttributes() {
    return this.character.attributes.filter(a => !this.isReservedAttr(a.key));
  }

  attrs(keys: string[]): Attribute[] {
    const result = [];

    keys.forEach(k => {
      const a = this.attr(k);

      if (a !== null) {
        result.push(a);
      }
    });

    return result;
  }

  attr(key: string): Attribute | null {
    if (this.attributeGatherer) {
      return this.attributeGatherer.get(key);
    } else {
      return null;
    }
  }
}
