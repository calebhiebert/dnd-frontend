import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from '../../services/session.service';
import {Campaign} from '../../types';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {CampaignService} from '../../services/campaign.service';

@Component({
  selector: 'app-session-view',
  templateUrl: './session-view.component.html',
  styleUrls: ['./session-view.component.css']
})
export class SessionViewComponent implements OnInit, OnDestroy {

  campaignId: string;

  loading = false;
  campaign: Campaign;

  sessSub: Subscription;
  routeSub: Subscription;

  get session() {
    return this.campaign.session;
  }

  constructor(private sessionService: SessionService, private route: ActivatedRoute, private campService: CampaignService,
              private router: Router) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.campaignId = params['id'];
      this.loadData();
    });

    this.campService.subscribe(this.campaignId);
  }

  ngOnDestroy(): void {
    if (this.sessSub) {
      this.sessSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  loadData() {
    this.loading = true;

    this.sessionService.getCampaignSession(this.campaignId)
      .subscribe(campaign => {
        this.loading = false;
        this.campaign = campaign;
      });
  }

  finishSession() {
    this.sessionService.finishSession(this.session.id)
      .then(() => {
        this.router.navigate(['campaign', this.campaignId]);
      });
  }
}
