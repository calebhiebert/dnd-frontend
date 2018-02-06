import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCharacterListComponent } from './index-character-list.component';

describe('IndexCharacterListComponent', () => {
  let component: IndexCharacterListComponent;
  let fixture: ComponentFixture<IndexCharacterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexCharacterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCharacterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
