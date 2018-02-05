import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {CampaignService, MY_CAMPAIGNS_QUERY} from '../campaign.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Campaign, CharacterCampaignOperationResponse} from '../types';
import {Subscription} from 'rxjs/Subscription';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {AuthService} from '../auth.service';
import {SessionService} from '../session.service';

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
              private toast: ToastrService, private apollo: Apollo, private auth: AuthService,
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

    this.campaignSub = this.campService.getCampaignForView(id)
      .subscribe(campaign => {
        console.log('Campaign Updated');
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
    this.apollo.mutate({
      mutation: gql`
        mutation DeleteCampaign($id: ID!) {
          deleteCampaign(id: $id)
        }`,

      variables: {
        id: this.campaign.id
      },

      update: (store) => {
        store.writeQuery({
          query: gql`
            query RemoveCampaignQuery($id: ID!) {
              getCampaign(id: $id) {
                id
              }
            }`, variables: {id: this.campaign.id}, data: null
        });
      },

      refetchQueries: [
        {query: MY_CAMPAIGNS_QUERY}
      ]
    }).subscribe(() => this.router.navigate(['home']));
  }

  startSession() {
    this.sessionService.startSession(this.campaign.id)
      .then(session => {
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
