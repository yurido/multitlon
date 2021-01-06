import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDaysOffComponent } from './change-days-off.component';

describe('ChangeDaysOffComponent', () => {
  let component: ChangeDaysOffComponent;
  let fixture: ComponentFixture<ChangeDaysOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeDaysOffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDaysOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
