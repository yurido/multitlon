import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SprintComponent} from './sprint.component';
import {SprintService} from '../services/sprint.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Router} from '@angular/router';
import * as exerciseStatistic from '../mock-data/sprint-statistic.json';
import * as sprintData from '../mock-data/sprint.json';
import * as exerciseMetadata from '../mock-data/exercise-metadata.json';
import {delay} from 'rxjs/operators';
import {of} from 'rxjs';
import {SprintCalendar} from '../models/sprint.calendar';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('SprintComponent', () => {
  let component: SprintComponent;
  let fixture: ComponentFixture<SprintComponent>;

  beforeEach(async(() => {

    // tslint:disable-next-line:max-line-length
    const spySprintService = jasmine.createSpyObj('SprintService', ['getExercisesCurrentSprint', 'getExerciseStatisticsForCurrentSprint', 'getExerciseMetadata', 'sortSprintExercisesByDate']);
    spySprintService.getExercisesCurrentSprint.and.returnValue(of(((sprintData) as any).default));
    spySprintService.getExerciseStatisticsForCurrentSprint.and.returnValue(of(((exerciseStatistic) as any).default));
    spySprintService.getExerciseMetadata.and.returnValue(of(((exerciseMetadata) as any).default));
    const exercises = new SprintCalendar().deserialize((((sprintData) as any).default));
    spySprintService.sortSprintExercisesByDate.and.returnValue(exercises.getSprintExercises());
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
    const headerDebugg = page.query(By.css('[class="badge-dark container sticky-top max-width"]'));
    const header: HTMLElement = headerDebugg.nativeElement;
    const span = header.querySelector('span');
    expect(span.textContent).toBe('february');

  });
});
