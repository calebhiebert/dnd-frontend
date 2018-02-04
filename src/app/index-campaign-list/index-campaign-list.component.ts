import {Component, OnDestroy, OnInit} from '@angular/core';
import {Campaign} from '../types';
import {CampaignService} from '../campaign.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-index-campaign-list',
  templateUrl: './index-campaign-list.component.html',
  styleUrls: ['./index-campaign-list.component.css']
})
export class IndexCampaignListComponent implements OnInit, OnDestroy {

  campaigns: Array<Campaign>;
  loading = false;

  subscription: Subscription;

  constructor(private campService: CampaignService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.subscription = this.campService.getMyCampaigns()
      .subscribe(campaigns => {
        this.campaigns.forEach(c => this.campService.subscribeCampaign(c.id));
        this.campaigns = campaigns;
        this.loading = false;
      });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
