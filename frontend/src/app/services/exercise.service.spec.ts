import { TestBed } from '@angular/core/testing';

import { SprintService } from './sprint.service';

describe('ExcerciseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SprintService = TestBed.get(SprintService);
    expect(service).toBeTruthy();
  });
});
