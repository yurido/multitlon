import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SprintComponent} from './sprint.component';
import {SprintService} from '../services/sprint.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Router} from '@angular/router';
import * as sprintProgress from '../mock-data/sprint-progress.json';
import * as sprintData from '../mock-data/sprint-exercises.json';
import * as exerciseMetadata from '../mock-data/exercise-metadata.json';
import {of} from 'rxjs';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ExerciseList} from '../models/exercise.list';

describe('SprintComponent', () => {
  let component: SprintComponent;
  let fixture: ComponentFixture<SprintComponent>;

  beforeEach(waitForAsync(() => {

    // tslint:disable-next-line:max-line-length
    const spySprintService = jasmine.createSpyObj('SprintService', ['getExercisesForCurrentSprint', 'getCurrentSprintProgress', 'getExerciseMetadata', 'sortSprintExercisesByDate']);
    spySprintService.getExercisesForCurrentSprint.and.returnValue(of(((sprintData) as any).default));
    spySprintService.getCurrentSprintProgress.and.returnValue(of(((sprintProgress) as any).default));
    spySprintService.getExerciseMetadata.and.returnValue(of(((exerciseMetadata) as any).default));
    const exercises = new ExerciseList().deserialize((((sprintData) as any).default));
    // spySprintService.sortSprintExercisesByDate.and.returnValue(exercises.getSprintExercises());
    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);
    const state = {isDataChanged: false};
    history.pushState(state, 'ingen');

    TestBed.configureTestingModule({
      declarations: [SprintComponent],
      providers: [{provide: SprintService, useValue: spySprintService},
        {provide: Router, useValue: spyRouter}, HttpClient, HttpHandler]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show list of exercises', () => {
    fixture.detectChanges();

    const page: DebugElement = fixture.debugElement;
    // title is present
    const headerDebugg = page.query(By.css('[class="container sticky-top width-1010"]'));
    const header: HTMLElement = headerDebugg.nativeElement;
    const span = header.querySelector('span');
    if (span !== null) {
      expect(span.textContent).toBe('february');
    }

    const tableDebugg = page.query(By.css('[class="table table-sm"]'));
    expect(tableDebugg).toBeTruthy();
    const table: HTMLElement = tableDebugg.nativeElement;
    if (table !== null && table.textContent !== null) {
      expect(table.textContent.indexOf('swim')).toBeGreaterThan(-1);
      expect(table.textContent.indexOf('squats')).toBeGreaterThan(-1);
      expect(table.textContent.indexOf('run')).toBeGreaterThan(-1);
      expect(table.textContent.indexOf('2000 kg')).toBeGreaterThan(-1);
    }
  });
});
