import { Component, OnInit } from '@angular/core';
import { KeyValuePair } from '../models/key-value-pair';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApplicationSetup } from '../models/application-setup';
import { ApplicationSetupService } from '../services/application-setup.service';
import { HostSetup } from '../models/host-setup';

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
  private hostsSetup: Array<HostSetup>;

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

  public onHostsSetupChange(hostsSetup: Array<HostSetup>) {
    this.hostsSetup = hostsSetup;
  }

  public onSubmit() {
    const applicationSetup: ApplicationSetup = this.form.value;
    applicationSetup.dockerSetup.environmentVariables = this.environmentVariables;
    applicationSetup.dockerSetup.ports = this.ports;
    applicationSetup.hostsSetup = this.hostsSetup;

    console.log(JSON.stringify(applicationSetup));
    // this.applicationSetupService.saveApplicationSetup(applicationSetup).subscribe();
  }

}
