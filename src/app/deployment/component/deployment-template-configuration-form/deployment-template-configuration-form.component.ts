import { Component, OnInit } from '@angular/core';
import { KeyValuePair } from '../../../shared/model/key-value-pair';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApplicationService } from '../../services/application.service';
import { HostSetup } from '../../model/host-setup';
import { DeploymentTemplate } from '../../model/deployment-template';
import { DeploymentService } from '../../services/deployment.service';
import { Application } from '../../model/application';
import { DockerApplicationSetup } from '../../model/docker/docker-application-setup';

@Component({
  selector: 'app-deployment-template-configuration-form',
  templateUrl: './deployment-template-configuration-form.component.html',
  styleUrls: ['./deployment-template-configuration-form.component.sass']
})
export class DeploymentTemplateConfigurationFormComponent implements OnInit {

  public hide = true;
  public form: FormGroup;
  public applications: Array<Application>;
  public loadingApplication = true;
  public environmentVariables: Array<KeyValuePair>;
  public ports: Array<KeyValuePair>;
  public extraHosts: Array<KeyValuePair>;
  public volumes: Array<KeyValuePair>;

  private environmentVariablesUpdated: Array<KeyValuePair>;
  private extraHostsUpdated: Array<KeyValuePair>;
  private volumesUpdated: Array<KeyValuePair>;
  private application: Application;
  private hostsSetup: Array<HostSetup>;

  constructor(
    private formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private deploymentTemplateService: DeploymentService) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      applicationId: ''
    });

    this.applicationService.getAll()
      .subscribe(applications => {
        this.applications = applications;
        this.loadingApplication = false;
      });
  }

  public onApplicationChange(applicationSelected: Application): void {
    if (applicationSelected) {
      this.application = this.applications.find(application => application.id === applicationSelected.id);
      const dockerApplicationSetup = this.application.applicationSetup as unknown as DockerApplicationSetup;

      this.ports = Object.entries(dockerApplicationSetup.ports).map(([key, value]) => new KeyValuePair(key, value));
      this.environmentVariables = Object.entries(dockerApplicationSetup.environmentVariables).map(([key, value]) => new KeyValuePair(key, value));
      this.extraHosts = Object.entries(dockerApplicationSetup.extraHosts).map(([key, value]) => new KeyValuePair(key, value));
      this.volumes = Object.entries(dockerApplicationSetup.volumes).map(([key, value]) => new KeyValuePair(key, value));
    }
  }

  public onEnvironmentVariablesChange(environmentVariables: Array<KeyValuePair>): void {
    this.environmentVariablesUpdated = environmentVariables;
  }

  public onExtraHostsChange(extraHosts: Array<KeyValuePair>): void {
    this.extraHostsUpdated = extraHosts;
  }

  public onVolumesChange(volumes: Array<KeyValuePair>): void {
    this.volumesUpdated = volumes;
  }

  public onHostsSetupChange(hostsSetup: Array<HostSetup>): void {
    this.hostsSetup = hostsSetup;
  }

  public onSubmit(): void {
    const form = this.form.value;

    const deploymentTemplate = new DeploymentTemplate();
    deploymentTemplate.name = form.name;
    deploymentTemplate.hostsSetup = this.hostsSetup;

    const dockerApplicationSetup = this.application.applicationSetup as unknown as DockerApplicationSetup;

    dockerApplicationSetup.environmentVariables = this.environmentVariablesUpdated ? this.environmentVariablesUpdated.reduce((map, environmentVariable) =>
      (map[environmentVariable.key] = environmentVariable.value, map), new Map<string, string>()) : new Map<string, string>();

    dockerApplicationSetup.extraHosts = this.extraHostsUpdated ? this.extraHostsUpdated.reduce((map, extraHost) =>
      (map[extraHost.key] = extraHost.value, map), new Map<string, string>()) : new Map<string, string>();

    dockerApplicationSetup.volumes = this.volumesUpdated ? this.volumesUpdated.reduce((map, volume) =>
      (map[volume.key] = volume.value, map), new Map<string, string>()) : new Map<string, string>();

    const application = new Application(dockerApplicationSetup);
    application.id = form.applicationId;

    deploymentTemplate.application = application;

    this.deploymentTemplateService.saveDeploymentTemplate(deploymentTemplate).subscribe();
  }

}
