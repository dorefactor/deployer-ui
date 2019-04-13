import { TestBed } from '@angular/core/testing';

import { ApplicationSetupService } from './application-setup.service';

describe('ApplicationSetupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationSetupService = TestBed.get(ApplicationSetupService);
    expect(service).toBeTruthy();
  });
});
