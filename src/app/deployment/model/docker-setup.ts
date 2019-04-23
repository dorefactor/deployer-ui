import { KeyValuePair } from '../../shared/model/key-value-pair';

export class DockerSetup {

    public registryUrl: string;
    public imageName: string;
    public environmentVariables: Array<KeyValuePair>;
    public ports: Array<KeyValuePair>;

}
