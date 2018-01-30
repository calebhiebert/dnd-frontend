import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeEditRowComponent } from './attribute-edit-row.component';

describe('AttributeEditRowComponent', () => {
  let component: AttributeEditRowComponent;
  let fixture: ComponentFixture<AttributeEditRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeEditRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeEditRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
