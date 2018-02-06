import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCampaignListComponent } from './index-campaign-list.component';

describe('IndexCampaignListComponent', () => {
  let component: IndexCampaignListComponent;
  let fixture: ComponentFixture<IndexCampaignListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexCampaignListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCampaignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
