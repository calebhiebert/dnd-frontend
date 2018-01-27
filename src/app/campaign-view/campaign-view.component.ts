import {Component, OnInit} from '@angular/core';
import {CampaignService} from '../campaign.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Campaign} from '../types';

@Component({
  selector: 'app-campaign-view',
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.css']
})
export class CampaignViewComponent implements OnInit {

  campaign: Campaign;
  loading = false;

  constructor(private campService: CampaignService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadCampaign(params['id']);
    });
  }

  loadCampaign(id: number) {
    this.campaign = null;

    this.loading = true;
    this.campService.getCampaign(id)
      .subscribe(resp => {
        this.campaign = resp.data.getCampaign;
        this.loading = false;
      });
  }
}
