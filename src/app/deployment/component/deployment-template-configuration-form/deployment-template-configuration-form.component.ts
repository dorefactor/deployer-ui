import { Component, OnInit } from '@angular/core';
import { KeyValuePair } from '../../../shared/model/key-value-pair';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApplicationSetup } from '../../model/application-setup';
import { ApplicationService } from '../../services/application.service';
import { HostSetup } from '../../model/host-setup';
import { DeploymentTemplateSetup } from '../../model/deployment-template-setup';
import { DeploymentService } from '../../services/deployment.service';

@Component({
  selector: 'app-deployment-template-configuration-form',
  templateUrl: './deployment-template-configuration-form.component.html',
  styleUrls: ['./deployment-template-configuration-form.component.sass']
})
export class DeploymentTemplateConfigurationFormComponent implements OnInit {

  public hide = true;
  public form: FormGroup;
  public applicationsSetup: Array<ApplicationSetup>;
  public applicationSetup: ApplicationSetup;

  private environmentVariables: Array<KeyValuePair>;
  private ports: Array<KeyValuePair>;
  private hostsSetup: Array<HostSetup>;

  constructor(private formBuilder: FormBuilder,
              private applicationSetupService: ApplicationService,
              private deploymentTemplateService: DeploymentService) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      applicationId: ''
    });

    this.applicationSetupService.getApplications().subscribe(applicationsSetup => this.applicationsSetup = applicationsSetup);
  }

  public onApplicationSetupChange(applicationSetupSelected: ApplicationSetup) {
    this.applicationSetup = this.applicationsSetup.find(applicationSetup => applicationSetup.id === applicationSetupSelected.id);

    if (this.applicationSetup) {
      this.environmentVariables = this.applicationSetup.dockerSetup.environmentVariables;
      this.ports = this.applicationSetup.dockerSetup.ports;
    }
  }

  public onEnvironmentVariablesChange(environmentVariables: Array<KeyValuePair>) {
    this.environmentVariables = environmentVariables;
  }

  public onPortsChange(ports: Array<KeyValuePair>) {
    this.ports = ports;
  }

  public onHostsSetupChange(hostsSetup: Array<HostSetup>) {
    this.hostsSetup = hostsSetup;
  }

  public onSubmit() {
    const form = this.form.value;

    const deploymentTemplateSetup = new DeploymentTemplateSetup();
    deploymentTemplateSetup.name = form.name;
    deploymentTemplateSetup.applicationId = form.applicationId;
    deploymentTemplateSetup.environmentVariables = this.environmentVariables;
    deploymentTemplateSetup.ports = this.ports;
    deploymentTemplateSetup.hostsSetup = this.hostsSetup;

    console.log(JSON.stringify(deploymentTemplateSetup));

    this.deploymentTemplateService.saveDeploymentTemplateSetup(deploymentTemplateSetup).subscribe();
  }

}
