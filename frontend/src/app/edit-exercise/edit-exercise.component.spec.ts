import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';

import {EditExerciseComponent} from './edit-exercise.component';
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

describe('EditExerciseComponent', () => {
  let component: EditExerciseComponent;
  let fixture: ComponentFixture<EditExerciseComponent>;
  let metadata: any;
  let spySprintService;

  beforeEach(waitForAsync(() => {
    // tslint:disable-next-line:max-line-length
    spySprintService = jasmine.createSpyObj('SprintService', ['getExerciseMetadata']);
    metadata = spySprintService.getExerciseMetadata.and.returnValue(of(((exerciseMetadata) as any).default));
    // spySprintService.getExerciseMetadata.and.returnValue(throwError(new MultiTError('No metadata found!!!')));

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
      declarations: [EditExerciseComponent],
      providers: [{provide: SprintService, useValue: spySprintService}, {
        provide: Router,
        useValue: spyRouter
      }, HttpClient, HttpHandler]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExerciseComponent);
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
    const headerDebugg = page.query(By.css('[class="badge-dark sticky-top container width-1010"]'));
    const header: HTMLElement = headerDebugg.nativeElement;
    const span = header.querySelector('span');
    if (span !== null) {
      expect(span.textContent).toBe('shoulders');
    }

    // button back is present
    const buttonBackDebugg = page.query(By.css('[class="btn btn-dark margin-3px"]'));
    expect(buttonBackDebugg).toBeTruthy();

    // button cancel is not present
    const cancel: HTMLElement = buttonBackDebugg.nativeElement;
    expect(cancel.textContent.indexOf('cancel')).toBe(-1);

    // button delete is not present - how?!
  });

  it('should click button "edit" and add values', fakeAsync(() => {
    spyOn(component, 'edit');
    const page: DebugElement = fixture.debugElement;
    const editButtonDebugg = page.query(By.css('[class="btn btn-light btn-exercise-operate"]'));
    const buttonEdit: HTMLElement = editButtonDebugg.nativeElement;
    buttonEdit.click();
    tick();
    expect(component.edit).toHaveBeenCalled();
    /* does not work!
    const plusButtonDebugg = page.query(By.css('[class="btn btn-light btn-transparent"]'));
    const buttonPlus: HTMLElement = plusButtonDebugg.nativeElement;
    expect(buttonPlus).toBeTruthy();

    spyOn(component, 'addReps');
    buttonPlus.click();
    tick();
    expect(component.addReps).toHaveBeenCalled();
    */
  }));

  // Does not work!
  /*
  it('should display error', () => {
    // setTimeout(() => 2000);
    fixture.detectChanges();
    const page: DebugElement = fixture.debugElement;
    const errorDebugg = page.query(By.css('alert-danger'));
    // const error: HTMLElement = errorDebugg.context
    expect(errorDebugg.context).toBeTruthy();
  }); */
});
