/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Marvel reading stats');
  }));

  it('should have a showNav property to false', () => {
    let fixture = TestBed.createComponent(HeaderComponent);
    let header = fixture.debugElement.componentInstance;
    expect(header.showNav).toEqual(false);
  });

  describe('toggleNav', () => {
    it('should reverse showNav value', () => {
      let fixture = TestBed.createComponent(HeaderComponent);
      let header = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      expect(header.showNav).toEqual(false);
      header.toggleNav();
      expect(header.showNav).toEqual(true);
    });
  });
});
