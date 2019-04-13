import { DockerSetup as DockerSetup } from './docker-setup';
import { TuplaThree } from './tupla-three';

export class ApplicationSetup {

    public name: string;
    public dockerSetup: DockerSetup;
    public hosts: Array<TuplaThree>;

}
