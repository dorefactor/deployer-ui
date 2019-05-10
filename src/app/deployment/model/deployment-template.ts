import { HostSetup } from './host-setup';
import { Application } from './application';

export class DeploymentTemplate {

  public id: string;
  public name: string;
  public application: Application;
  public hostsSetup: Array<HostSetup>;

}
