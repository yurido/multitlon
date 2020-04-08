import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SprintComponent} from './sprint.component';
import {SprintService} from '../services/sprint.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('SprintComponent', () => {
  let component: SprintComponent;
  let fixture: ComponentFixture<SprintComponent>;

  beforeEach(async(() => {

    const spySprintService = jasmine.createSpyObj('SprintService', ['getCurrentSprint']);
    spySprintService.getCurrentSprint.and.returnValue({ subscribe: () => {
      return '{"sprintExercises": []}';
      } });

    TestBed.configureTestingModule({
      declarations: [SprintComponent],
      providers: [{provide: SprintService, useValue: spySprintService}, HttpClient, HttpHandler]
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
