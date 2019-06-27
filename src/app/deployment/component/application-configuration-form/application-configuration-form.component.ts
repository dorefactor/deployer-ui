import { Component, OnInit } from '@angular/core';
import { KeyValuePair } from '../../../shared/model/key-value-pair';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApplicationService } from '../../services/application.service';
import { DockerApplicationSetup } from '../../model/docker/docker-application-setup';
import { Application } from '../../model/application';
import { ApplicationType } from '../../enums/application-type';

@Component({
  selector: 'app-application-configuration-form',
  templateUrl: './application-configuration-form.component.html',
  styleUrls: ['./application-configuration-form.component.sass']
})
export class ApplicationConfigurationFormComponent implements OnInit {

  public form: FormGroup;
  public isPrivateRegistry = false;
  private environmentVariables: Array<KeyValuePair>;
  private ports: Array<KeyValuePair>;
  private extraHosts: Array<KeyValuePair>;
  private volumes: Array<KeyValuePair>;

  constructor(
    private formBuilder: FormBuilder,
    private applicationService: ApplicationService) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      applicationSetup: this.formBuilder.group({
        registry: this.formBuilder.group({
          isPrivate: '',
          url: '',
          username: '',
          password: ''
        }),
        image: this.formBuilder.group({
          name: ''
        })
      })
    });
  }

  public onEnvironmentVariablesChange(environmentVariables: Array<KeyValuePair>): void {
    this.environmentVariables = environmentVariables;
  }

  public onPortsChange(ports: Array<KeyValuePair>): void {
    this.ports = ports;
  }

  public onExtraHostsChange(extraHosts: Array<KeyValuePair>): void {
    this.extraHosts = extraHosts;
  }

  public onVolumesChange(volumes: Array<KeyValuePair>): void {
    this.volumes = volumes;
  }

  public onSubmit(): void {
    const form = this.form.value;

    const applicationSetup: DockerApplicationSetup = form.applicationSetup;
    applicationSetup.type = ApplicationType[ApplicationType.Docker];

    applicationSetup.environmentVariables = this.environmentVariables ? this.environmentVariables.reduce((map, environmentVariable) =>
      (map[environmentVariable.key] = environmentVariable.value, map), new Map<string, string>()) : new Map<string, string>();

    applicationSetup.ports = this.ports ? this.ports.reduce((map, port) =>
      (map[port.key] = port.value, map), new Map<string, string>()) : new Map<string, string>();

    applicationSetup.extraHosts = this.extraHosts ? this.extraHosts.reduce((map, extraHost) =>
      (map[extraHost.key] = extraHost.value, map), new Map<string, string>()) : new Map<string, string>();

    applicationSetup.volumes = this.volumes ? this.volumes.reduce((map, volume) =>
      (map[volume.key] = volume.value, map), new Map<string, string>()) : new Map<string, string>();

    const application = new Application(applicationSetup);
    application.name = form.name;

    this.applicationService.save(application).subscribe();
  }

}
