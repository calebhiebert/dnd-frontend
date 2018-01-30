import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationBubbleComponent } from './notification-bubble.component';

describe('NotificationBubbleComponent', () => {
  let component: NotificationBubbleComponent;
  let fixture: ComponentFixture<NotificationBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
