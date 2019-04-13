import { Component, OnInit } from '@angular/core';
import { KeyValuePair } from '../models/key-value-pair';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApplicationSetup } from '../models/application-setup';
import { TuplaThree } from '../models/tupla-three';
import { ApplicationSetupService } from '../services/application-setup.service';

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

  constructor(private formBuilder: FormBuilder,
              private applicationSetupService: ApplicationSetupService) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      dockerSetup: this.formBuilder.group({
        registryUrl: '',
        imageName: ''
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
    const applicationSetup: ApplicationSetup = this.form.value;
    applicationSetup.dockerSetup.environmentVariables = this.environmentVariables;
    applicationSetup.dockerSetup.ports = this.ports;
    applicationSetup.hosts = this.hosts;

    this.applicationSetupService.saveApplicationSetup(applicationSetup).subscribe();
  }

}
