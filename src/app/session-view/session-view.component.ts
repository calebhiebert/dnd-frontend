import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from '../session.service';
import {Session} from '../types';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {CampaignService} from '../campaign.service';

@Component({
  selector: 'app-session-view',
  templateUrl: './session-view.component.html',
  styleUrls: ['./session-view.component.css']
})
export class SessionViewComponent implements OnInit, OnDestroy {

  campaignId: string;

  loading = false;
  session: Session;

  sessSub: Subscription;
  routeSub: Subscription;

  constructor(private sessionService: SessionService, private route: ActivatedRoute, private campService: CampaignService,
              private router: Router) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.campaignId = params['id'];
      this.loadData();
    });

    this.campService.subscribeCampaign(this.campaignId);
    this.loadData();
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
        this.session = campaign.session;
      });
  }

  finishSession() {
    this.sessionService.finishSession(this.session.id)
      .then((session: Session) => {
        this.router.navigate(['campaign', this.campaignId]);
      });
  }
}
