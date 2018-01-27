import {Component, Input, OnInit} from '@angular/core';
import {Campaign} from '../types';
import {CampaignService} from '../campaign.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css']
})
export class CampaignFormComponent implements OnInit {

  editId: number;
  campaign: Campaign;
  loading = false;

  constructor(private campService: CampaignService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.campaign = new Campaign();

    this.route.params.subscribe(params => {
      this.editId = params['id'];
      this.loadCampaign();
    });
  }

  loadCampaign() {
    this.loading = true;

    this.campService.getCampaign(this.editId)
      .subscribe(res => {
        this.loading = false;
        Object.assign(this.campaign, res.data.getCampaign);
      });
  }

  save() {
    if (this.editId !== undefined) {
      this.campService.editCampaign(this.campaign)
        .subscribe(resp => {
          this.router.navigate(['']);
        });
    } else {
      this.campService.createCampaign(this.campaign)
        .subscribe(resp => {
          this.router.navigate(['']);
        });
    }
  }
}
