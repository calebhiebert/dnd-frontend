import {Component, Input, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

const JOIN_REQUEST_OPERATION_MUTATION = gql`
  mutation JoinRequestOperation($id: ID!, $op: CampaignJoinRequestOperation!) {
    campaignJoinRequestOperation(campaignJoinRequestId: $id, op: $op)
  }`;

@Component({
  selector: 'app-join-request-row-view',
  templateUrl: './join-request-row-view.component.html',
  styleUrls: ['./join-request-row-view.component.css']
})
export class JoinRequestRowViewComponent implements OnInit {

  @Input()
  request: any;

  loading = false;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
  }

  operate(operator) {
    this.apollo.mutate({
      mutation: JOIN_REQUEST_OPERATION_MUTATION,

      variables: {
        id: this.request.id,
        op: operator
      },

      update: (store, {data}) => {

      }
    })
      .subscribe(resp => console.log(resp));
  }
}
