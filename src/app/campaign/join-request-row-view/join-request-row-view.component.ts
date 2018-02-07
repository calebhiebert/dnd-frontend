import {Component, Input, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Router} from '@angular/router';
import {CampaignService} from '../../services/campaign.service';

@Component({
  selector: 'app-join-request-row-view',
  templateUrl: './join-request-row-view.component.html',
  styleUrls: ['./join-request-row-view.component.css']
})
export class JoinRequestRowViewComponent implements OnInit {

  @Input()
  request: any;

  @Input()
  campaignId: string;

  loading = false;

  constructor(private campService: CampaignService, private router: Router) { }

  ngOnInit() {
  }

  viewCharacter() {
    this.router.navigate(['character', this.request.character.id]);
  }

  operate(operator) {
    this.campService.joinRequestOperation(this.request.id, operator, this.campaignId)
      .then();
  }
}
