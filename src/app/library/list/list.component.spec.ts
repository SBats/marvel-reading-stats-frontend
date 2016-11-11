/* tslint:disable:no-unused-variable */
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '../../shared';
import { ListComponent } from './list.component';

@Component({
  template: ''
})
class DummyComponent {
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([
         { path: ':collection/:list/comics', component: DummyComponent }
        ])
      ],
      declarations: [ ListComponent, DummyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    inject(
      [Router, Location],
      (Router: Router, location: Location) => {

      fixture = TestBed.createComponent(ListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  }));

  it('should create', () => {
    async(() => {
      expect(component).toBeTruthy();
    })
  });
});
