import { Component, OnInit } from '@angular/core';
import { KeyValuePair } from '../models/key-value-pair';

@Component({
  selector: 'app-configuration-form',
  templateUrl: './configuration-form.component.html',
  styleUrls: ['./configuration-form.component.sass']
})
export class ConfigurationFormComponent {

  public hide = true;

  public onEnvironmentVariablesChange(environmentVariables: Array<KeyValuePair>) {
    console.log(environmentVariables);
  }

  public onPortsChange(ports: Array<KeyValuePair>) {
    console.log(ports);
  }

}
