import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HostSetup } from '../../model/host-setup';
import { DeploymentTemplateSetup } from '../../model/deployment-template-setup';
import { DeploymentService as DeploymentService } from '../../services/deployment.service';

@Component({
  selector: 'app-deployment-form',
  templateUrl: './deployment-form.component.html',
  styleUrls: ['./deployment-form.component.sass']
})
export class DeploymentFormComponent implements OnInit {

  public hide = true;
  public form: FormGroup;
  public deploymentTemplatesSetup: Array<DeploymentTemplateSetup>;
  public deploymentTemplateSetup: DeploymentTemplateSetup;

  private hostsSetup: Array<HostSetup>;

  constructor(private formBuilder: FormBuilder,
              private deploymentService: DeploymentService) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      deploymentTemplateId: '',
      version: ''
    });

    this.deploymentService.getDeploymentTemplates().subscribe(deploymentTemplates => this.deploymentTemplatesSetup = deploymentTemplates);
  }

  public onDeploymentTemplateSetupChange(deploymentTemplateSetupSelected: DeploymentTemplateSetup) {
    this.deploymentTemplateSetup = this.deploymentTemplatesSetup.find(deploymentTemplateSetup => deploymentTemplateSetup.id === deploymentTemplateSetupSelected.id);
    if (this.deploymentTemplateSetup) {
      this.hostsSetup = this.deploymentTemplateSetup.hostsSetup;
    }
  }

  public onSubmit() {
    // const form = this.form.value;

    // const deploymentTemplateSetup = new DeploymentTemplateSetup();
    // deploymentTemplateSetup.name = form.name;
    // deploymentTemplateSetup.applicationId = form.applicationId;
    // deploymentTemplateSetup.environmentVariables = this.environmentVariables;
    // deploymentTemplateSetup.ports = this.ports;
    // deploymentTemplateSetup.hostsSetup = this.hostsSetup;

    // console.log(JSON.stringify(deploymentTemplateSetup));

    // this.deploymentService.saveDeploymentTemplateSetup(deploymentTemplateSetup).subscribe();
  }

}
