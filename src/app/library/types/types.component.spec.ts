/* tslint:disable:no-unused-variable */
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '../../shared';
import { TypesComponent } from './types.component';

@Component({
  template: ''
})
class DummyComponent {
}

describe('TypesComponent', () => {
  let component: TypesComponent;
  let fixture: ComponentFixture<TypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([
         { path: ':collection/list', component: DummyComponent }
        ])
      ],
      declarations: [ TypesComponent, DummyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    inject(
      [Router, Location],
      (Router: Router, location: Location) => {

      fixture = TestBed.createComponent(TypesComponent);
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
