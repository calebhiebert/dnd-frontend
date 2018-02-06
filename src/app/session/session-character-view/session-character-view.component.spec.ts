import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCharacterViewComponent } from './session-character-view.component';

describe('SessionCharacterViewComponent', () => {
  let component: SessionCharacterViewComponent;
  let fixture: ComponentFixture<SessionCharacterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionCharacterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionCharacterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
