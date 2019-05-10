import { ApplicationSetup } from './application-setup';

export class Application {

  public id: string;
  public name: string;
  public applicationSetup: ApplicationSetup;

  constructor(applicationSetup: ApplicationSetup) {
    this.applicationSetup = applicationSetup;
  }

}
