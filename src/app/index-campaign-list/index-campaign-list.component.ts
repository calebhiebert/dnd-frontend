import { Component, OnInit } from '@angular/core';
import {Campaign} from '../types';
import {CampaignService} from '../campaign.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index-campaign-list',
  templateUrl: './index-campaign-list.component.html',
  styleUrls: ['./index-campaign-list.component.css']
})
export class IndexCampaignListComponent implements OnInit {

  campaigns: Array<Campaign>;
  loading = false;

  constructor(private campService: CampaignService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.campService.getMyCampaigns()
      .subscribe(campaigns => {
        this.campaigns = campaigns;
        this.loading = false;
      });
  }
}
