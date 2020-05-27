import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExerciseComponent} from './exercise.component';
import {SprintService} from '../services/sprint.service';
import {Router} from '@angular/router';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Exercise} from '../models/exercise';
import {ExerciseStatistic} from '../models/exercise.statistic';
import * as exerciseMetadata from '../mock-data/exercise-metadata.json';
import { By } from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {of} from 'rxjs';

describe('ExerciseComponent', () => {
  let component: ExerciseComponent;
  let fixture: ComponentFixture<ExerciseComponent>;
  let metadata;

  beforeEach(async(() => {
    // tslint:disable-next-line:max-line-length
    const spySprintService = jasmine.createSpyObj('SprintService', ['getNumberFromString', 'getFloatFromString', 'updateExercise', 'isStringContainsNumbers', 'getExerciseMetadata']);
    metadata = spySprintService.getExerciseMetadata.and.returnValue(of(((exerciseMetadata) as any).default));

    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);
    // tslint:disable-next-line:max-line-length
    const jsonEx = JSON.parse('{"id": 12345678998, "sid": "SHOULDERS", "date": 1580511600000, "reps": [{"weight":600, "reps":500}], "rawPoints": 1500, "totalPoints": 1320, "time": 0}');
    const exerciseShoulders = new Exercise().deserialize(jsonEx);
    // tslint:disable-next-line:max-line-length
    const jsonStatistic = JSON.parse('{"sid":"SHOULDERS", "progress":1, "totalRaw":1566, "totalPoints":444, "averagePoints":898, "maxPonts":89, "quota":23}');
    const statisticShoulders = new ExerciseStatistic().deserialize(jsonStatistic);
    const state = {ex: exerciseShoulders, statistic: statisticShoulders};
    history.pushState(state, 'ingen');

    TestBed.configureTestingModule({
      declarations: [ExerciseComponent],
      providers: [{provide: SprintService, useValue: spySprintService}, {
        provide: Router,
        useValue: spyRouter
      }, HttpClient, HttpHandler]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain button "edit"', () => {
    fixture.detectChanges();

    const footer: DebugElement = fixture.debugElement;
    const editButtonDebugg = footer.query(By.css('[class="btn btn-light btn-exercise-operate"]'));
    const buttonEdit: HTMLElement = editButtonDebugg.nativeElement;
    expect(buttonEdit.textContent).toContain('edit');
    expect(buttonEdit.attributes.getNamedItem('disabled')).toBe(null);

    expect(metadata.calls.any()).toBe(true, 'exercise metadata called');
  });
});
