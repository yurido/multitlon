import { TestBed } from '@angular/core/testing';

import { HeloMultitlonService } from './helo-multitlon.service';

describe('HeloMultitlonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeloMultitlonService = TestBed.get(HeloMultitlonService);
    expect(service).toBeTruthy();
  });
});
