import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionQuickeditFormComponent } from './session-quickedit-form.component';

describe('SessionQuickeditFormComponent', () => {
  let component: SessionQuickeditFormComponent;
  let fixture: ComponentFixture<SessionQuickeditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionQuickeditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionQuickeditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
