import {TestBed} from '@angular/core/testing';

import {SprintService} from './sprint.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('SprintService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [HttpClient, HttpHandler]
  }));

  it('should be created', () => {
    const service: SprintService = TestBed.get(SprintService);
    expect(service).toBeTruthy();
  });
});
