import {Component, OnDestroy, OnInit} from '@angular/core';
import {CampaignService} from '../campaign.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Campaign} from '../types';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-campaign-view',
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.css']
})
export class CampaignViewComponent implements OnInit, OnDestroy {

  campaign: Campaign;
  loading = false;

  subscription: Subscription;

  constructor(private campService: CampaignService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadCampaign(params['id']);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadCampaign(id: number) {
    this.campaign = null;

    this.loading = true;
    this.subscription = this.campService.getCampaign(id)
      .subscribe(campaign => {
        this.campaign = campaign;
        this.loading = false;
      });
  }
}
