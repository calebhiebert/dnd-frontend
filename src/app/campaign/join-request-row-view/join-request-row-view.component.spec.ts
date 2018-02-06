import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinRequestRowViewComponent } from './join-request-row-view.component';

describe('JoinRequestRowViewComponent', () => {
  let component: JoinRequestRowViewComponent;
  let fixture: ComponentFixture<JoinRequestRowViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinRequestRowViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinRequestRowViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
