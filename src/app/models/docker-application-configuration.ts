import { KeyValuePair } from './key-value-pair';

export class DockerApplicationConfiguration {

    public applicationName: string;
    public registryUrl: string;
    public imageName: string;
    public imageTag: string;
    public environmentVariables: Array<KeyValuePair>;
    public ports: Array<KeyValuePair>;

}
