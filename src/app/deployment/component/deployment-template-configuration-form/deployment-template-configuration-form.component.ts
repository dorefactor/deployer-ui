import { Component, OnInit } from '@angular/core';
import { KeyValuePair } from '../../../shared/model/key-value-pair';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApplicationSetup } from '../../model/application-setup';
import { ApplicationSetupService } from '../../services/application-setup.service';
import { HostSetup } from '../../model/host-setup';

@Component({
  selector: 'app-deployment-template-configuration-form',
  templateUrl: './deployment-template-configuration-form.component.html',
  styleUrls: ['./deployment-template-configuration-form.component.sass']
})
export class DeploymentTemplateConfigurationFormComponent implements OnInit {

  public hide = true;
  public form: FormGroup;
  private environmentVariables: Array<KeyValuePair>;
  private ports: Array<KeyValuePair>;
  private hostsSetup: Array<HostSetup>;

  public applicationsSetup: Array<ApplicationSetup>;
  public applicationSetup: ApplicationSetup;

  constructor(private formBuilder: FormBuilder,
              private applicationSetupService: ApplicationSetupService) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      dockerSetup: this.formBuilder.group({
        registryUrl: '',
        imageName: '',
        environmentVariables: this.formBuilder.array([])
      })
    });

    this.applicationSetupService.getApplications().subscribe(applicationsSetup => this.applicationsSetup = applicationsSetup);
  }

  public onApplicationSetupChange(applicationSetupSelected: ApplicationSetup) {
    this.applicationSetup = this.applicationsSetup.find(applicationSetup => applicationSetup.id === applicationSetupSelected.id);
    if (this.applicationSetup) {
      this.environmentVariables = this.applicationSetup.dockerSetup.environmentVariables;
      this.ports = this.applicationSetup.dockerSetup.ports;
      this.hostsSetup = this.applicationSetup.hostsSetup;
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
    const applicationSetup: ApplicationSetup = this.form.value;
    applicationSetup.dockerSetup.environmentVariables = this.environmentVariables;
    applicationSetup.dockerSetup.ports = this.ports;
    applicationSetup.hostsSetup = this.hostsSetup;

    this.applicationSetupService.saveApplicationSetup(applicationSetup).subscribe();
  }

}
