import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Router} from '@angular/router';
import gql from 'graphql-tag';
import {Campaign, GetCampaignsResponse} from '../types';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
import {Subscription} from 'rxjs/Subscription';

const CAMPAIGN_SEARCH_QUERY = gql`
  query GetCampaignsQuery($searchTerm: String) {
    getCampaigns(searchTerm: $searchTerm) {
      id
      name
      description
    }
  }`;

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

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit() {
    this.loadCampaigns(null);

    this.searchSub = this.searchUpdated.asObservable()
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe(searchTerm => this.loadCampaigns(searchTerm));
  }

  loadCampaigns(searchTerm) {
    this.loading = true;

    this.apollo.query<GetCampaignsResponse>({
      query: CAMPAIGN_SEARCH_QUERY,

      variables: {
        searchTerm: searchTerm
      }
    }).map(resp => resp.data.getCampaigns)
      .toPromise()
      .then(campaigns => {
        this.campaigns = campaigns;
        this.loading = false;
      });
  }

  onSearchType() {
    this.searchUpdated.next(this.searchTerm);
  }
}
