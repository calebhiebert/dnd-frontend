import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Campaign} from '../../types';
import {CampaignService} from '../../services/campaign.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css']
})
export class CampaignFormComponent implements OnInit, OnDestroy {

  editId: string;

  campaign: Campaign = new Campaign();
  loading = false;

  paramSub: Subscription;
  campSub: Subscription;

  constructor(private campService: CampaignService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.editId = params['id'];
      if (this.editId !== undefined) {
        this.loadCampaign();
      }
    });
  }

  ngOnDestroy() {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }

    if (this.campSub) {
      this.campSub.unsubscribe();
    }
  }

  loadCampaign() {
    this.loading = true;

    this.campSub = this.campService.get(this.editId)
      .subscribe(campaign => {
        this.loading = false;
        Object.assign(this.campaign, campaign);
      });
  }

  save() {
    this.loading = true;

    if (this.editId !== undefined) {
      this.campService.edit(this.campaign)
        .then(campaign => {
          this.router.navigate(['campaign', campaign.id]);
          this.loading = false;
        });
    } else {
      this.campService.create(this.campaign)
        .then(() => {
          this.router.navigate(['home']);
          this.loading = false;
        });
    }
  }
}
