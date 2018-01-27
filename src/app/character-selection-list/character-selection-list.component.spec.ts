import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSelectionListComponent } from './character-selection-list.component';

describe('CharacterSelectionListComponent', () => {
  let component: CharacterSelectionListComponent;
  let fixture: ComponentFixture<CharacterSelectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterSelectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
