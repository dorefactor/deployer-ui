import { HostSetup } from './host-setup';
import { KeyValuePair } from 'src/app/shared/model/key-value-pair';

export class DeploymentTemplateSetup {

    public id: string;
    public name: string;
    public applicationId: string;
    public environmentVariables: Array<KeyValuePair>;
    public ports: Array<KeyValuePair>;
    public hostsSetup: Array<HostSetup>;

}
