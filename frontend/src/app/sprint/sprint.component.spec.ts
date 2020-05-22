import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SprintComponent} from './sprint.component';
import {SprintService} from '../services/sprint.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Router} from '@angular/router';
import * as exerciseStatistic from '../mock-data/sprint-statistic.json';
import * as sprintData from '../mock-data/sprint.json';
import * as exerciseMetadata from '../mock-data/exercise-metadata.json';
import {delay} from 'rxjs/operators';

describe('SprintComponent', () => {
  let component: SprintComponent;
  let fixture: ComponentFixture<SprintComponent>;

  beforeEach(async(() => {

    const spySprintService = jasmine.createSpyObj('SprintService', ['getExercisesCurrentSprint', 'getExerciseStatisticsForCurrentSprint', 'getExerciseMetadata']);
    spySprintService.getExercisesCurrentSprint.and.returnValue({
      subscribe: () => {
        return sprintData;
      }
    });
    spySprintService.getExerciseStatisticsForCurrentSprint.and.returnValue({
      subscribe: () => {
        return exerciseStatistic;
      }
    });
    spySprintService.getExerciseMetadata.and.returnValue({
      subscribe: () => {
        return exerciseMetadata;
      }
    });
    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);
    const state = {isDataChanged: false};
    history.pushState(state, 'ingen');

    TestBed.configureTestingModule({
      declarations: [SprintComponent],
      providers: [{provide: SprintService, useValue: spySprintService}, {provide: Router, useValue: spyRouter}, HttpClient, HttpHandler]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    // delay(1000);
  });
});
