import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentTemplateConfigurationFormComponent } from './deployment-template-configuration-form.component';

describe('DeploymentTemplateConfigurationFormComponent', () => {
  let component: DeploymentTemplateConfigurationFormComponent;
  let fixture: ComponentFixture<DeploymentTemplateConfigurationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeploymentTemplateConfigurationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentTemplateConfigurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
