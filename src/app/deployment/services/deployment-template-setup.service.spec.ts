import { TestBed } from '@angular/core/testing';

import { DeploymentTemplateSetupService } from './deployment-template-setup.service';

describe('DeploymentTemplateSetupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeploymentTemplateSetupService = TestBed.get(DeploymentTemplateSetupService);
    expect(service).toBeTruthy();
  });
});
