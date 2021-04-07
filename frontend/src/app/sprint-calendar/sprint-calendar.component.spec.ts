import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SprintCalendarComponent } from './sprint-calendar.component';

describe('SprintCalendarComponent', () => {
  let component: SprintCalendarComponent;
  let fixture: ComponentFixture<SprintCalendarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
