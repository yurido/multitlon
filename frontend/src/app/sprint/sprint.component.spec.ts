import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SprintComponent} from './sprint.component';
import {SprintService} from '../services/sprint.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Router} from '@angular/router';

describe('SprintComponent', () => {
  let component: SprintComponent;
  let fixture: ComponentFixture<SprintComponent>;

  beforeEach(async(() => {

    const spySprintService = jasmine.createSpyObj('SprintService', ['getCurrentSprintExercises', 'getCurrentSprintExerciseStatistic']);
    spySprintService.getCurrentSprintExercises.and.returnValue({
      subscribe: () => {
        return '{"sprintExercises": []}';
      }
    });
    spySprintService.getCurrentSprintExerciseStatistic.and.returnValue({
      subscribe: () => {
        return '{"exerciseStatistic": []}';
      }
    });
    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
