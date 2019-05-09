import { HostSetup } from './host-setup';
import { ApplicationSetup } from './application-setup';

export class DeploymentOrder {

  public deploymentTemplateId: string;
  public requestId: string;
  public createdAt: Date;
  public applicationSetup: ApplicationSetup;
  public hostsSetup: Array<HostSetup>;

}
