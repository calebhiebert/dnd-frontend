import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {CampaignService} from '../campaign.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Campaign} from '../types';
import {Subscription} from 'rxjs/Subscription';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-campaign-view',
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.css']
})
export class CampaignViewComponent implements OnInit {

  campaign: Campaign;
  loading = false;

  characterSelectionModalRef: BsModalRef;

  constructor(private campService: CampaignService, private router: Router,
              private route: ActivatedRoute, private modalService: BsModalService,
              private toast: ToastrService, private apollo: Apollo) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadCampaign(params['id']);
    });
  }

  loadCampaign(id: number) {
    this.campaign = null;

    this.loading = true;
    this.apollo.watchQuery({
      query: gql`
        query GetCampaignForViewScreen($id: ID!) {
          getCampaign(id: $id) {
            id
            name
            description
            mine
            characters {
              id
              name
              description
              hp
              maxHp
              creator {
                username
              }
            }
          }
        }`,

      variables: {
        id
      }
    }).valueChanges
    .map((resp: any) => resp.data.getCampaign)
    .subscribe(campaign => {
      this.loading = false;
      this.campaign = campaign;
    });
  }

  onCharacterSelected(character) {
    this.characterSelectionModalRef.hide();

    this.apollo.mutate({
      mutation: gql`
        mutation CharacterJoinCampaign($charId: ID!, $campId: ID!, $op: CharacterCampaignOperation!) {
          characterCampaignOperation(characterId: $charId, campaignId: $campId, op: $op)
        }`,

      variables: {
        charId: character.id,
        campId: this.campaign.id,
        op: 'JOIN',
      }
    })
    .subscribe(() => {
      this.toast.info(`Sent request for ${character.name} to join ${this.campaign.name}`, null, {
        progressBar: true,
        positionClass: 'toast-bottom-right'
      });
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
        store.writeQuery({query: gql`
            query RemoveCampaignQuery($id: ID!) {
              getCampaign(id: $id) {
                id
              }
            }`, variables: {id: this.campaign.id}, data: null});
      }
    }).subscribe(() => this.router.navigate(['']));
  }

  openModal(template: TemplateRef<any>) {
    this.characterSelectionModalRef = this.modalService.show(template);
  }
}
