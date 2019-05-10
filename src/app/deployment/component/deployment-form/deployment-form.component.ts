import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HostSetup } from '../../model/host-setup';
import { DeploymentTemplate } from '../../model/deployment-template';
import { DeploymentService as DeploymentService } from '../../services/deployment.service';
import { DeploymentOrder } from '../../model/deployment-order';
import * as _ from 'lodash';
import { DockerApplicationSetup } from '../../model/docker/docker-application-setup';
import { Image } from '../../model/docker/image';
import { ApplicationType } from '../../enums/application-type';
import { Application } from '../../model/application';

@Component({
  selector: 'app-deployment-form',
  templateUrl: './deployment-form.component.html',
  styleUrls: ['./deployment-form.component.sass']
})
export class DeploymentFormComponent implements OnInit {

  public hide = true;
  public form: FormGroup;
  public deploymentTemplates: Array<DeploymentTemplate>;
  public deploymentTemplate: DeploymentTemplate;
  public hostsSetup: Array<HostSetup>;
  public loadingDeploymentTemplates = true;

  constructor(private formBuilder: FormBuilder,
              private deploymentService: DeploymentService) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      deploymentTemplateId: '',
      tag: ''
    });

    this.deploymentService.getDeploymentTemplates()
      .subscribe(deploymentTemplates => {
        this.deploymentTemplates = deploymentTemplates;
        this.loadingDeploymentTemplates = false;
      });
  }

  public onDeploymentTemplateChange(deploymentTemplateSelected: DeploymentTemplate): void {
    if (deploymentTemplateSelected) {
      this.deploymentTemplate = this.deploymentTemplates.find(deploymentTemplate => deploymentTemplate.id === deploymentTemplateSelected.id);
      this.hostsSetup = this.deploymentTemplate.hostsSetup;
    } else {
      this.hostsSetup = [];
    }
  }

  public onHostsSetupChange(hostsSetup: Array<HostSetup>): void {
    this.hostsSetup = hostsSetup;
  }

  public onSubmit(): void {
    const form = this.form.value;

    const deploymentOrder = new DeploymentOrder();
    deploymentOrder.deploymentTemplateId = form.deploymentTemplateId;
    deploymentOrder.hostsSetup = this.getOnlyHostsSetupWithHostsSelected();

    const image = new Image();
    image.tag = form.tag;

    const dockerApplicationSetup = new DockerApplicationSetup();
    dockerApplicationSetup.type = ApplicationType[ApplicationType.Docker];
    dockerApplicationSetup.image = image;

    const application = new Application(dockerApplicationSetup);
    application.id = this.deploymentTemplate.application.id;

    deploymentOrder.application = application;

    this.deploymentService.createDeploymentOrder(deploymentOrder).subscribe();
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
