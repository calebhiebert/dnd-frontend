import {Component, Input, OnInit} from '@angular/core';
import {Campaign} from '../types';
import {CampaignService} from '../campaign.service';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css']
})
export class CampaignFormComponent implements OnInit {

  @Input()
  editId: number;

  campaign: Campaign;
  loading = false;

  constructor(private campService: CampaignService) {
  }

  ngOnInit() {
    this.campaign = new Campaign();

    if (this.editId !== undefined) {
      this.loading = true;

      this.campService.getCampaign(this.editId)
        .subscribe(res => {
          this.loading = false;
          Object.assign(this.campaign, res.data.getCampaign);
        });
    }
  }
}
