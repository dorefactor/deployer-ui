import { Component, OnInit } from '@angular/core';
import { KeyValuePair } from '../models/key-value-pair';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApplicationConfiguration } from '../models/application-configuration';
import { TuplaThree } from '../models/tupla-three';

@Component({
  selector: 'app-configuration-form',
  templateUrl: './configuration-form.component.html',
  styleUrls: ['./configuration-form.component.sass']
})
export class ConfigurationFormComponent implements OnInit {

  public hide = true;
  public form: FormGroup;
  private environmentVariables: Array<KeyValuePair>;
  private ports: Array<KeyValuePair>;
  private hosts: Array<TuplaThree>;

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      configurationName: '',
      hostIpAddress: '',
      hostUsername: '',
      hostUsernamePassword: '',
      dockerApplicationConfiguration: this.formBuilder.group({
        applicationName: '',
        registryUrl: '',
        imageName: '',
        imageTag: ''
      })
    });
  }

  public onEnvironmentVariablesChange(environmentVariables: Array<KeyValuePair>) {
    this.environmentVariables = environmentVariables;
  }

  public onPortsChange(ports: Array<KeyValuePair>) {
    this.ports = ports;
  }

  public onTuplaThreeChange(hosts: Array<TuplaThree>) {
    this.hosts = hosts;
  }

  public onSubmit() {
    const applicationConfiguration: ApplicationConfiguration = this.form.value;
    applicationConfiguration.dockerApplicationConfiguration.environmentVariables = this.environmentVariables;
    applicationConfiguration.dockerApplicationConfiguration.ports = this.ports;

    console.log(applicationConfiguration);
  }

}
