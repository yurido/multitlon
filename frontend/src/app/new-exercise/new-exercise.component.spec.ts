import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewExerciseComponent } from './new-exercise.component';

describe('NewExerciseComponent', () => {
  let component: NewExerciseComponent;
  let fixture: ComponentFixture<NewExerciseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
