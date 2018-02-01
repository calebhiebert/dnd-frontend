import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Campaign} from '../types';
import {CampaignService} from '../campaign.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css']
})
export class CampaignFormComponent implements OnInit, OnDestroy {

  editId: number;

  campaign: Campaign;
  loading = false;

  private ngUnsubscribe = new Subject();

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
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadCampaign() {
    this.loading = true;

    this.campService.getCampaign(this.editId)
      .subscribe(campaign => {
        this.loading = false;
        Object.assign(this.campaign, campaign);
      });
  }

  save() {
    if (this.editId !== undefined) {
      this.campService.editCampaign(this.campaign)
        .subscribe((campaign: Campaign) => {
          this.router.navigate(['campaign', campaign.id]);
        });
    } else {
      this.campService.createCampaign(this.campaign)
        .subscribe(() => {
          this.router.navigate(['']);
        });
    }
  }
}
