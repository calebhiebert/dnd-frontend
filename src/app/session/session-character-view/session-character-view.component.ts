import {Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Campaign, Character} from '../../types';
import {SessionService} from '../../services/session.service';
import {Subscription} from 'rxjs/Subscription';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-session-character-view',
  templateUrl: './session-character-view.component.html',
  styleUrls: ['./session-character-view.component.css']
})
export class SessionCharacterViewComponent implements OnInit, OnDestroy {

  @Input()
  campaignId: string;

  @ViewChild('quickedit')
  quickEdit: TemplateRef<any>;

  characters: Character[];
  campaign: Campaign;
  loading = false;

  selectedCharacter: Character;

  sub: Subscription;

  modalRef: BsModalRef;

  constructor(private sessionService: SessionService, private modal: BsModalService) {
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  loadData() {
    this.loading = true;

    this.sub = this.sessionService.getCampaignSession(this.campaignId, false, true)
      .subscribe(campaign => {
        this.campaign = campaign;
        this.characters = campaign.characters;
        this.loading = false;
      });
  }

  select(character: Character | null) {
    if (this.campaign.mine || character.mine) {
      this.selectedCharacter = character;
      this.modalRef = this.modal.show(this.quickEdit, {
        keyboard: false,
        animated: false
      });
    }
  }
}
