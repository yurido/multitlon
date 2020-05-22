import {TestBed} from '@angular/core/testing';

import {SprintService} from './sprint.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {HttpTestingController} from '@angular/common/http/testing';
import * as exerciseMetadataJSON from '../mock-data/exercise-metadata.json';
import {ExerciseMetadataList} from '../models/exercise.metadata.list';

describe('SprintService', () => {
  let service: SprintService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, HttpTestingController]
    });
    service = TestBed.get(SprintService);
    httpMock = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
// TODO: funkar ej!
  it('should return metadata', () => {
    const metadata = new ExerciseMetadataList().deserialize(((exerciseMetadataJSON) as any).default);
    service.getExerciseMetadata().subscribe(meta => {
        expect(meta.getExerciseMetadata.length).toBe(64);
        expect(meta).toEqual(metadata);
      }
    );
    service.getExerciseMetadata();
/*
    const request = httpMock.expectOne(service.getExercisMetadataURL());
    expect(request.request.method).toBe('GET');
    request.flush(exerciseMetadataJSON); */
  });
});
