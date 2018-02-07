import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import gql from 'graphql-tag';
import {Subscription} from 'rxjs/Subscription';
import {CampaignService} from '../../services/campaign.service';

@Component({
  selector: 'app-campaign-join-request-view',
  templateUrl: './campaign-join-request-view.component.html',
  styleUrls: ['./campaign-join-request-view.component.css']
})
export class CampaignJoinRequestViewComponent implements OnInit, OnDestroy {

  @Input()
  campaignId: string;

  joinRequests: Array<any>;

  campaign: any;

  loading = false;

  sub: Subscription;

  constructor(private campService: CampaignService) { }

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

    this.sub = this.campService.get(this.campaignId, {joinRequests: true})
      .subscribe(campaign => {
        this.campaign = campaign;
        this.joinRequests = campaign.joinRequests;
        this.loading = false;
      });
  }
}
