import { HostSetup } from './host-setup';
import { ApplicationSetup } from './application-setup';

export class DeploymentTemplate {

  public id: string;
  public name: string;
  public applicationId: string;
  public applicationSetup: ApplicationSetup;
  public hostsSetup: Array<HostSetup>;

}
