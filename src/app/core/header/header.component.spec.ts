/* tslint:disable:no-unused-variable */
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '../../shared';
import { HeaderComponent } from './header.component';

@Component({
  template: ''
})
class DummyComponent {
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([
         { path: '/library', component: DummyComponent }
        ])
      ],
      declarations: [ HeaderComponent, DummyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    inject(
      [Router, Location],
      (Router: Router, location: Location) => {

      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      component.title = 'test';
      fixture.detectChanges();
    })
  }));

  it('should create', () => {
    async(() => {
      expect(component).toBeTruthy();
    })
  });
  
  it('should create', () => {
    async(() => {
      let title  = fixture.debugElement.query(By.css('h1'));
      expect(title.nativeElement.textContent).toContain('test');
    })
  });
});
