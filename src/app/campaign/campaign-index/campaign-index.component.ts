import {Component, OnInit} from '@angular/core';
import {Campaign} from '../../types';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
import {Subscription} from 'rxjs/Subscription';
import {CampaignService} from '../../services/campaign.service';

@Component({
  selector: 'app-campaign-index',
  templateUrl: './campaign-index.component.html',
  styleUrls: ['./campaign-index.component.css']
})
export class CampaignIndexComponent implements OnInit {

  searchTerm: string;
  campaigns: Campaign[];
  loading = false;

  searchUpdated: Subject<string> = new Subject<string>();

  searchSub: Subscription;

  constructor(private campService: CampaignService) { }

  ngOnInit() {
    this.loadCampaigns(null);

    this.searchSub = this.searchUpdated.asObservable()
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe(searchTerm => this.loadCampaigns(searchTerm));
  }

  loadCampaigns(searchTerm) {
    this.loading = true;

    this.campService.search(searchTerm)
      .then(campaigns => {
        this.campaigns = campaigns;
        this.loading = false;
      });
  }

  onSearchType() {
    this.searchUpdated.next(this.searchTerm);
  }
}
