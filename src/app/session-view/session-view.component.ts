import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from '../session.service';
import {Session} from '../types';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';

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

  constructor(private sessionService: SessionService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.campaignId = params['id'];
      this.loadData();
    });

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
      .subscribe(session => {
        this.loading = false;
        this.session = session;
      });
  }

  finishSession() {
    this.sessionService.finishSession(this.session.id)
      .then((session: Session) => {
        console.log(session);
      });
  }
}
