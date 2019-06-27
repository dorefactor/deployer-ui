import { Registry } from './registry';
import { Image } from './image';
import { ApplicationSetup } from '../application-setup';

export class DockerApplicationSetup extends ApplicationSetup {

  public registry: Registry;
  public image: Image;
  public ports: Map<string, string>;
  public environmentVariables: Map<string, string>;
  public extraHosts: Map<string, string>;
  public volumes: Map<string, string>;

}
