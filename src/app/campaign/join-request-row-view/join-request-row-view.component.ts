import {Component, Input, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Router} from '@angular/router';

const JOIN_REQUEST_OPERATION_MUTATION = gql`
  mutation JoinRequestOperation($id: ID!, $op: CampaignJoinRequestOperation!) {
    campaignJoinRequestOperation(campaignJoinRequestId: $id, op: $op)
  }`;

const UPDATE_QUERY = gql`
  query GetCampaignForUpdate($id: ID!) {
    getCampaign(id: $id) {
      id
      joinRequests(status: [WAITING]) {
        id
        status
      }
    }
  }`;

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

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit() {
  }

  viewCharacter() {
    this.router.navigate(['character', this.request.character.id]);
  }

  operate(operator) {
    this.apollo.mutate({
      mutation: JOIN_REQUEST_OPERATION_MUTATION,

      variables: {
        id: this.request.id,
        op: operator
      },

      refetchQueries: [
        {query: gql`
            query UpdateCampaignCache($id: ID!) {
              getCampaign(id: $id) {
                id
                characters {
                  id
                  name
                  description
                  hp
                  maxHp
                  creator {
                    username
                  }
                }
              }
            }`,

        variables: {
          id: this.campaignId
        }},

        {query: UPDATE_QUERY, variables: {id: this.campaignId}}
      ]
    }).toPromise()
      .then(resp => console.log(resp));
  }
}
