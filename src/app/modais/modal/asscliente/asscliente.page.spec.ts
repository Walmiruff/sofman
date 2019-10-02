import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssclientePage } from './asscliente.page';

describe('AssclientePage', () => {
  let component: AssclientePage;
  let fixture: ComponentFixture<AssclientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssclientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssclientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
