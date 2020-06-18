import {TestBed} from '@angular/core/testing';

import {SprintService} from './sprint.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import * as exerciseMetadataJSON from '../mock-data/exercise-metadata.json';
import * as exerciseStatistic from '../mock-data/sprint-statistic.json';
import * as sprintData from '../mock-data/sprint.json';
import {ExerciseMetadataList} from '../models/exercise.metadata.list';
import {SprintExerciseStatisticCalendar} from '../models/sprint.exercise.statistic.calendar';
import {SprintCalendar} from '../models/sprint.calendar';
import {Exercise} from '../models/exercise';

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

  it('should return exercise global metadata', () => {
    const metadata = new ExerciseMetadataList().deserialize(((exerciseMetadataJSON) as any).default);
    service.getExerciseMetadata().subscribe(data => {
        expect(data.getExerciseMetadata().length).toBeGreaterThan(20);
        expect(data).toEqual(metadata);
      }
    );
    const request = httpTestingController.expectOne(service.getExercisMetadataURL());
    expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('Content-Type')).toEqual('application/json');
    request.flush(metadata);
  });

  it('should return SHOULDERS statistics for user "test" for current sprint', () => {
    const shoulders = 'SHOULDERS';
    const sprintStatistics = new SprintExerciseStatisticCalendar().deserialize(((exerciseStatistic) as any).default);
    const shouldersStat = sprintStatistics.getExerciseStatistic().find(value => value.getSid() === shoulders);
    service.getExerciseStatisticForCurrentSprint(shoulders, 'test').subscribe(data => {
      expect(data.getSid()).toEqual(shoulders);
      expect(data.getQuota()).toBeGreaterThan(0);
      expect(data.getMaxPonts()).toBeGreaterThan(0);
      expect(data.getProgress()).toBeGreaterThan(0);
    });
    const request = httpTestingController.expectOne((req: any) =>
      req.url.indexOf(service.getExerciseStatisticsCurrentSprintURL() + '/' + shoulders) > -1);
    expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('Content-Type')).toEqual('application/json');
    expect(request.request.params.get('user')).toEqual('test');
    expect(request.request.params.get('date')).toBeGreaterThan(0);
    request.flush(shouldersStat);
  });

  it('should return statistics for all the exercises for user "test" for current sprint', () => {
    const sprintStatistics = new SprintExerciseStatisticCalendar().deserialize(((exerciseStatistic) as any).default);
    service.getExerciseStatisticsForCurrentSprint('test', false).subscribe(data => {
      expect(data.getExerciseStatistic().length).toBeGreaterThan(10);
      expect(typeof data.getExerciseStatistic()).toEqual('object');
      expect(typeof data.getExerciseStatistic()[0]).toEqual('object');
    });
    const request = httpTestingController.expectOne((req: any) =>
      req.url.indexOf(service.getExerciseStatisticsCurrentSprintURL()) > -1);
    expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('Content-Type')).toEqual('application/json');
    expect(request.request.params.get('user')).toEqual('test');
    expect(request.request.params.get('date')).toBeGreaterThan(0);
    request.flush(sprintStatistics);
  });

  it('should return all the exercises for user "test" for current sprint', () => {
    const exercises = new SprintCalendar().deserialize(((sprintData) as any).default);
    service.getExercisesCurrentSprint('test', false).subscribe(data => {
      expect(data.getSprintExercises().length).toBeGreaterThan(5);
      expect(data).toEqual(exercises);
    });
    const request = httpTestingController.expectOne((req: any) =>
      req.url.indexOf(service.getSprintExercisesURL()) > -1);
    expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('Content-Type')).toEqual('application/json');
    expect(request.request.params.get('user')).toEqual('test');
    expect(request.request.params.get('date')).toBeGreaterThan(0);
    request.flush(exercises);
  });

  it('should return updated exercise "SHOULDERS"', () => {
    // tslint:disable-next-line:max-line-length
    const json = JSON.parse('{"id": 1, "sid": "SHOULDERS", "date": 1581289200000, "reps": [], "rawPoints": 1500, "totalPoints": 1320, "time": 0}');
    const exercise = new Exercise().deserialize(json);
    service.updateExercise(exercise).subscribe(data => {
      expect(data.getId()).toEqual(exercise.getId());
      expect(data.getSid()).toEqual(exercise.getSid());
    });
    const request = httpTestingController.expectOne((req: any) =>
      req.url.indexOf(service.getSprintExercisesURL()) > -1);
    expect(request.request.method).toBe('PUT');
    expect(request.request.headers.get('Content-Type')).toEqual('application/json');
    request.flush(exercise);
  });

  // SHOULDERS exercise should be present in ../mock-data/sprint.json!
  it('should update exercise "SHOULDERS" with id "12345678998" in cache', () => {
    // tslint:disable-next-line:max-line-length
    const jsonEx = JSON.parse('{"id": 12345678998, "sid": "SHOULDERS", "date": 1580511600000, "reps": [{"weight":600, "reps":500}], "rawPoints": 1500, "totalPoints": 1320, "time": 0}');
    const exerciseShoulders = new Exercise().deserialize(jsonEx);

    const exercises = new SprintCalendar().deserialize(((sprintData) as any).default);
    service.getExercisesCurrentSprint('test', false).subscribe(data => {
      expect(data).toEqual(exercises);
    });
    const request = httpTestingController.expectOne((req: any) =>
      req.url.indexOf(service.getSprintExercisesURL()) > -1);
    expect(request.request.method).toBe('GET');
    request.flush(exercises);

    service.updateSprintExerciseInCache('test', exerciseShoulders).subscribe(data => {
      data.getSprintExercises().forEach(day => {
        day.getExercises().forEach(exercise => {
          if (exercise.getId() === exerciseShoulders.getId()) {
            console.log('SHOULDERS is found in sprint exercises!');
            expect(exercise.getReps().length).toEqual(1);
            expect(exercise.getTotalPoints()).toEqual(exerciseShoulders.getTotalPoints());
          }
        });
      });
    });
  });

  it('should replace object A with Z in array', () => {
    const listOfObjects: { id: number, name: string }[] = [
      {id: 0, name: 'A'},
      {id: 1, name: 'B'},
      {id: 2, name: 'C'}
    ];
    const objZ = {id: 3, name: 'Z'};
    listOfObjects.splice(0, 1, objZ);
    expect(listOfObjects[0].id).toEqual(objZ.id);
    expect(listOfObjects[0].name).toEqual(objZ.name);

    const listOfObj2: { day: { day: number }, exercises: { id: number, name: string }[] }[] = [{
      day: {day: 1},
      exercises: [{id: 1, name: 'A'}, {id: 2, name: 'B'}]
    }, {
      day: {day: 2},
      exercises: [{id: 3, name: 'C'}, {id: 4, name: 'A'}]
    },
    ];

    listOfObj2[1].exercises.splice(1, 1, objZ);
    expect(listOfObj2[1].exercises[1].id).toEqual(objZ.id);
    expect(listOfObj2[1].exercises[1].name).toEqual(objZ.name);

    // date test
    const date = new Date(1580511600000).getDate();
    const date2 = new Date(1580511601000).getDate();
    expect(date).toEqual(date2);
  });

  it('should not update exercise in empty cache', () => {
    // tslint:disable-next-line:max-line-length
    const exerciseShoulders = new Exercise();
    const exercises = new SprintCalendar().deserialize(((sprintData) as any).default);

    service.updateSprintExerciseInCache('test', exerciseShoulders).subscribe(data => {
      expect(data).toEqual(exercises);
    });

    const request = httpTestingController.expectOne((req: any) =>
      req.url.indexOf(service.getSprintExercisesURL()) > -1);
    expect(request.request.method).toBe('GET');
    request.flush(exercises);
  });
});
