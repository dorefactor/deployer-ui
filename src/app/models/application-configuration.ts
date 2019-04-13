import { DockerApplicationConfiguration } from './docker-application-configuration';
import { TuplaThree } from './tupla-three';

export class ApplicationConfiguration {

    public configurationName: string;
    public dockerApplicationConfiguration: DockerApplicationConfiguration;
    public hostsConfiguration: Array<TuplaThree>;
}
