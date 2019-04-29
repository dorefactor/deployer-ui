import { HostSetup } from './host-setup';

export class Deployment {

    public deploymentTemplateId: string;
    public version: string;
    public hosts: Array<HostSetup>;

}
