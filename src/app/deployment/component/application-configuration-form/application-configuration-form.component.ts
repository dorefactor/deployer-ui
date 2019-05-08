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

  public hide = true;
  public form: FormGroup;
  private environmentVariables: Array<KeyValuePair>;
  private ports: Array<KeyValuePair>;

  constructor(private formBuilder: FormBuilder,
              private applicationService: ApplicationService) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      applicationSetup: this.formBuilder.group({
        registry: this.formBuilder.group({
          isPrivate: false,
          url: ''
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

  public onSubmit(): void {
    const form = this.form.value;

    const applicationSetup: DockerApplicationSetup = form.applicationSetup;
    applicationSetup.type = ApplicationType[ApplicationType.Docker];
    applicationSetup.environmentVariables = this.environmentVariables.reduce((map, environmentVariable) =>
      (map[environmentVariable.key] = environmentVariable.value, map), new Map<string, string>());
    applicationSetup.ports = this.ports.reduce((map, port) =>
      (map[port.key] = port.value, map), new Map<string, string>());

    const application = new Application();
    application.name = form.name;
    application.applicationSetup = applicationSetup;

    this.applicationService.save(application).subscribe();
  }

}
