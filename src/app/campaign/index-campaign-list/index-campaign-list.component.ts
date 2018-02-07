import {Component, OnDestroy, OnInit} from '@angular/core';
import {Campaign} from '../../types';
import {CampaignService} from '../../services/campaign.service';
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

  constructor(private campService: CampaignService) { }

  ngOnInit() {
    this.loading = true;
    this.subscription = this.campService.getMine()
      .subscribe(campaigns => {
        campaigns.forEach(c => this.campService.subscribe(c.id));
        this.campaigns = campaigns;
        this.loading = false;
      });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
