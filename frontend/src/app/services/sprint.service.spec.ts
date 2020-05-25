import {TestBed} from '@angular/core/testing';

import {SprintService} from './sprint.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import * as exerciseMetadataJSON from '../mock-data/exercise-metadata.json';
import * as exerciseStatistic from '../mock-data/sprint-statistic.json';
import * as sprintData from '../mock-data/sprint.json';
import {ExerciseMetadataList} from '../models/exercise.metadata.list';
import {SprintExerciseStatisticCalendar} from '../models/sprint.exercise.statistic.calendar';

describe('SprintService', () => {
  let service: SprintService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SprintService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SprintService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return metadata', () => {
    const metadata = new ExerciseMetadataList().deserialize(((exerciseMetadataJSON) as any).default);
    service.getExerciseMetadata().subscribe(data => {
        expect(data.getExerciseMetadata().length).toBe(31);
        expect(data).toEqual(metadata);
      }
    );
    const request = httpTestingController.expectOne(service.getExercisMetadataURL());
    expect(request.request.method).toBe('GET');
    request.flush(metadata);
  });

  it('should return SHOULDERS statistics', () => {
    const shoulders = 'SHOULDERS';
    const sprintStatistics = new SprintExerciseStatisticCalendar().deserialize(((exerciseStatistic) as any).default);
    const shouldersStat = sprintStatistics.getExerciseStatistic().find(value => value.getSid() === shoulders);
    service.getExerciseStatisticForCurrentSprint(shoulders, 'test').subscribe(data => {
      expect(data.getSid()).toEqual(shoulders);
      expect(data.getQuota()).toBeGreaterThan(0);
      expect(data.getMaxPonts()).toBeGreaterThan(0);
      expect(data.getProgress()).toBeGreaterThan(0);
    });
    const request = httpTestingController.expectOne(service.getExerciseStatisticsCurrentSprintURL() + '/' + shoulders);
    expect(request.request.method).toBe('GET');
    request.flush(shouldersStat);
  });
});
