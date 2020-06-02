import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import {MultiTError} from '../models/multiterror';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    component.error = new MultiTError('There was en error!');
    fixture.detectChanges();
    const page: DebugElement = fixture.debugElement;
    const errorDebugg = page.query(By.css('[class="col-11 text-center"]'));
    const error: HTMLElement = errorDebugg.nativeElement;
    expect(error.textContent.indexOf('There was en error!')).toBeGreaterThan(-1);
  });
});
