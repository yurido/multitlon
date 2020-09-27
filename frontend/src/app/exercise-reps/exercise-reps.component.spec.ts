import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseRepsComponent } from './exercise-reps.component';

describe('ExerciseRepsComponent', () => {
  let component: ExerciseRepsComponent;
  let fixture: ComponentFixture<ExerciseRepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseRepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseRepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
