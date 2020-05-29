import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {ExerciseComponent} from './exercise.component';
import {SprintService} from '../services/sprint.service';
import {Router} from '@angular/router';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Exercise} from '../models/exercise';
import {ExerciseStatistic} from '../models/exercise.statistic';
import * as exerciseMetadata from '../mock-data/exercise-metadata.json';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {of, throwError} from 'rxjs';
import {tick} from '@angular/core/testing';
import {MultiTError} from '../models/multiterror';
import {browser} from 'protractor';

describe('ExerciseComponent', () => {
  let component: ExerciseComponent;
  let fixture: ComponentFixture<ExerciseComponent>;
  let metadata;
  let spySprintService;

  beforeEach(async(() => {
    // tslint:disable-next-line:max-line-length
    spySprintService = jasmine.createSpyObj('SprintService', ['getNumberFromString', 'getFloatFromString', 'updateExercise', 'isStringContainsNumbers', 'getExerciseMetadata']);
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

  it('should contain button "edit", title "shouldres", and call the exercise statistics from server/cache', () => {
    // fixture.detectChanges();

    // button edit exists and clickable
    const page: DebugElement = fixture.debugElement;
    const editButtonDebugg = page.query(By.css('[class="btn btn-light btn-exercise-operate"]'));
    const buttonEdit: HTMLElement = editButtonDebugg.nativeElement;
    expect(buttonEdit.textContent).toContain('edit');
    expect(buttonEdit.attributes.getNamedItem('disabled')).toBe(null);

    // exercise metadata is called
    expect(metadata.calls.any()).toBe(true, 'exercise metadata called');

    // title is present
    const headerDebugg = page.query(By.css('[class="badge-dark sticky-top container max-width"]'));
    const header: HTMLElement = headerDebugg.nativeElement;
    const span = header.querySelector('span');
    expect(span.textContent).toBe('shoulders');

    // button back is present
    const buttonBackDebugg = page.query(By.css('[class="btn btn-dark margin-3px"]'));
    expect(buttonBackDebugg).toBeTruthy();

    // button cancel is not present
    const cancel: HTMLElement = buttonBackDebugg.nativeElement;
    expect(cancel.textContent.indexOf('cancel')).toBe(-1);

    // button delete is not present - how?!
  });

  it('should click button "edit" and change values', () => {
    // how?
  });

  // Does not work!
  it('should display error', fakeAsync(() => {
    spySprintService.getExerciseMetadata.and.returnValue(throwError('No metadata found!!!'));
    // setTimeout(() => 2000);
    fixture.detectChanges();
    const page: DebugElement = fixture.debugElement;
    const errorDebugg = page.query(By.css('[class="alert alert-danger"]'));
    const error: HTMLElement = errorDebugg.nativeElement;
    expect(error.textContent).toBe('No metadata found!!!');
  }));
});
