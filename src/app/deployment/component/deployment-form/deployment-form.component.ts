import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HostSetup } from '../../model/host-setup';
import { DeploymentTemplateSetup } from '../../model/deployment-template-setup';
import { DeploymentService as DeploymentService } from '../../services/deployment.service';
import { Deployment } from '../../model/deployment';
import * as _ from 'lodash';

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
  public hostsSetup: Array<HostSetup>;

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
    if (deploymentTemplateSetupSelected) {
      this.deploymentTemplateSetup = this.deploymentTemplatesSetup.find(deploymentTemplateSetup => deploymentTemplateSetup.id === deploymentTemplateSetupSelected.id);
      if (this.deploymentTemplateSetup) {
        this.hostsSetup = this.deploymentTemplateSetup.hostsSetup;
      }
    } else {
      this.hostsSetup = [];
    }
  }

  public onHostsSetupChange(hostsSetup: Array<HostSetup>) {
    this.hostsSetup = hostsSetup;
  }

  public onSubmit() {
    const form = this.form.value;

    const deployment = new Deployment();
    deployment.deploymentTemplateId = form.deploymentTemplateId;
    deployment.version = form.version;
    deployment.hosts = this.getOnlyHostsSetupWithHostsSelected();

    this.deploymentService.createDeploymentOrder(deployment).subscribe();
  }

  private getOnlyHostsSetupWithHostsSelected(): HostSetup[] {
    // Clone 'hostsSetup' to filter only those are 'selected'
    const hostsSetupCloned = _.cloneDeep(this.hostsSetup.filter(hostSetup =>
      hostSetup.hasOwnProperty('selected') && hostSetup.selected));

    return hostsSetupCloned.filter(hostSetup => {
      // Remove hosts not 'selected'
      hostSetup.hosts = hostSetup.hosts.filter(host => host.hasOwnProperty('selected') && host.selected);
      return hostSetup.hosts.length > 0;
    });
  }

}
