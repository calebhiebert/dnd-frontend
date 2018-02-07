import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {CampaignService} from '../../services/campaign.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Campaign} from '../../types';
import {Subscription} from 'rxjs/Subscription';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../services/auth.service';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-campaign-view',
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.css']
})
export class CampaignViewComponent implements OnInit, OnDestroy {

  campaign: Campaign;
  loading = false;

  characterSelectionModalRef: BsModalRef;

  campaignSub: Subscription;

  constructor(private campService: CampaignService, private router: Router,
              private route: ActivatedRoute, private modalService: BsModalService,
              private toast: ToastrService, private auth: AuthService,
              private sessionService: SessionService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadCampaign(params['id']);
    });
  }

  ngOnDestroy(): void {
    if (this.campaignSub) {
      this.campaignSub.unsubscribe();
    }
  }

  loadCampaign(id: string) {
    this.campaign = null;
    this.loading = true;

    if (this.campaignSub) {
      this.campaignSub.unsubscribe();
    }

    this.campaignSub = this.campService.get(id, {characters: true, subscribe: true})
      .subscribe(campaign => {
        this.loading = false;
        this.campaign = campaign;
      });
  }

  onCharacterSelected(character) {
    this.characterSelectionModalRef.hide();

    this.campService.characterJoinCampaign(character.id, this.campaign.id)
      .then(addedImmediately => {
        if (addedImmediately) {
          this.toast.success(`Character added`, null, {positionClass: 'toast-bottom-right'});
        } else {
          this.toast.info(`Sent request for ${character.name} to join ${this.campaign.name}`, null, {
            positionClass: 'toast-bottom-right'
          });
        }
      });
  }

  delete() {
    this.campService.delete(this.campaign.id)
      .then(() => this.router.navigate(['home']));
  }

  startSession() {
    this.sessionService.startSession(this.campaign.id)
      .then(() => {
        this.router.navigate(['campaign', this.campaign.id, 'session']);
      });
  }

  openModal(template: TemplateRef<any>) {
    this.characterSelectionModalRef = this.modalService.show(template);
  }

  get loggedIn() {
    return this.auth.loggedIn;
  }
}
