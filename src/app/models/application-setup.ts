import { DockerSetup as DockerSetup } from './docker-setup';
import { TagSetup } from './tag-setup';

export class ApplicationSetup {

    public name: string;
    public dockerSetup: DockerSetup;
    public hostsSetup: Array<TagSetup>;

}
