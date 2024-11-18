/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FlowListComponent } from './flow-list.component';

describe('FlowListComponent', () => {
  let component: FlowListComponent;
  let fixture: ComponentFixture<FlowListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
