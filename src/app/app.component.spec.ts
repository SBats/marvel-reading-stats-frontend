/* tslint:disable:no-unused-variable */
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from './shared';
import { CoreModule } from './core';
import { AppComponent } from './app.component';

@Component({
  template: ''
})
class DummyComponent {
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        SharedModule,
        RouterTestingModule.withRoutes([
         { path: ':collection/:App/comics', component: DummyComponent }
        ])
      ],
      declarations: [ AppComponent, DummyComponent ]
    })
    TestBed.compileComponents();
  }));

  beforeEach(async(() => {
    inject(
      [Router, Location],
      (Router: Router, location: Location) => {

      fixture = TestBed.createComponent(AppComponent);
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
