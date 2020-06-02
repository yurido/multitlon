import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    component.loading = true;
    fixture.detectChanges();
    const page: DebugElement = fixture.debugElement;
    const spinnerDebugg = page.query(By.css('[class="spinner"]'));
    expect(spinnerDebugg).toBeTruthy();
  });
});
