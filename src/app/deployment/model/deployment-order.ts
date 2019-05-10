import { HostSetup } from './host-setup';
import { Application } from './application';

export class DeploymentOrder {

  public deploymentTemplateId: string;
  public requestId: string;
  public createdAt: Date;
  public application: Application;
  public hostsSetup: Array<HostSetup>;

}
