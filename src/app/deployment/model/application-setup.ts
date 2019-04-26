import { DockerSetup } from './docker-setup';
import { HostSetup } from './host-setup';

export class ApplicationSetup {

    public id: string;
    public name: string;
    public dockerSetup: DockerSetup;
    public hostsSetup: Array<HostSetup>;

}
