import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignJoinRequestViewComponent } from './campaign-join-request-view.component';

describe('CampaignJoinRequestViewComponent', () => {
  let component: CampaignJoinRequestViewComponent;
  let fixture: ComponentFixture<CampaignJoinRequestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignJoinRequestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignJoinRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
