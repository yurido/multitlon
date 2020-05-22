import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExerciseComponent} from './exercise.component';
import {SprintService} from '../services/sprint.service';
import {Router} from '@angular/router';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('ExerciseComponent', () => {
  let component: ExerciseComponent;
  let fixture: ComponentFixture<ExerciseComponent>;

  beforeEach(async(() => {
    const spySprintService = jasmine.createSpyObj('SprintService', ['getNumberFromString', 'getFloatFromString', 'updateExercise', 'isStringContainsNumbers']);
    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ExerciseComponent],
      providers: [{provide: SprintService, useValue: spySprintService}, {provide: Router, useValue: spyRouter}, HttpClient, HttpHandler]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
