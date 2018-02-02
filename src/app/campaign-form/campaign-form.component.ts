import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Campaign} from '../types';
import {CampaignService} from '../campaign.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css']
})
export class CampaignFormComponent implements OnInit, OnDestroy {

  editId: string;

  campaign: Campaign;
  loading = false;

  paramSub: Subscription;
  campSub: Subscription;

  constructor(private campService: CampaignService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.campaign = new Campaign();

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

    this.campSub = this.campService.getCampaign(this.editId)
      .subscribe(campaign => {
        this.loading = false;
        Object.assign(this.campaign, campaign);
      });
  }

  save() {
    this.loading = true;

    if (this.editId !== undefined) {
      this.campService.editCampaign(this.campaign)
        .subscribe((campaign: Campaign) => {
          this.router.navigate(['campaign', campaign.id]);
          this.loading = false;
        });
    } else {
      this.campService.createCampaign(this.campaign)
        .subscribe(() => {
          this.router.navigate(['home']);
          this.loading = false;
        });
    }
  }
}
