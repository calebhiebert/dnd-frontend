import {Component, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Quest} from '../../types';
import {Subscription} from 'rxjs/Subscription';
import {CampaignService} from '../../services/campaign.service';

@Component({
  selector: 'app-quest-view',
  templateUrl: './quest-view.component.html',
  styleUrls: ['./quest-view.component.css']
})
export class QuestViewComponent implements OnInit, OnDestroy {

  @Input()
  campaignId: string;

  @Input()
  editable: boolean;

  quests: Array<Quest>;

  loading = false;

  questSub: Subscription;

  constructor(private campService: CampaignService) {
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.questSub) {
      this.questSub.unsubscribe();
    }
  }

  loadData() {
    this.loading = true;

    this.questSub = this.campService.get(this.campaignId, {quests: true})
      .subscribe(campaign => {
        this.quests = campaign.quests;
        this.loading = false;
      });
  }
}
