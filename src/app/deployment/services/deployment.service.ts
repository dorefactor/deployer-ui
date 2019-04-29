import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeploymentTemplateSetup } from '../model/deployment-template-setup';
import { Deployment } from '../model/deployment';

@Injectable()
export class DeploymentService {

  private DEPLOYMENT_TEMPLATE_SETUP_RESOURCE_URI = `${environment.domain}/configuration/deployment-templates`;
  private DEPLOYMENT_ORDER_RESOURCE_URI = `${environment.domain}/configuration/deployment-orders`;

  constructor(private httpClient: HttpClient) {
  }

  public saveDeploymentTemplateSetup(deploymentTemplateSetup: DeploymentTemplateSetup): Observable<DeploymentTemplateSetup> {
    const propertiesToIgnore = ['selected'];
    const replacer = (key: any, value: any) => {
      return propertiesToIgnore.indexOf(key) > -1 ? undefined : value;
    };

    console.log(JSON.stringify(deploymentTemplateSetup, replacer));

    return this.httpClient.post<DeploymentTemplateSetup>(this.DEPLOYMENT_TEMPLATE_SETUP_RESOURCE_URI,
      JSON.stringify(deploymentTemplateSetup, replacer));
  }

  public getDeploymentTemplates(): Observable<DeploymentTemplateSetup[]> {
    return this.httpClient.get<DeploymentTemplateSetup[]>(this.DEPLOYMENT_TEMPLATE_SETUP_RESOURCE_URI);
  }

  public getDeploymentTemplateById(id: string): Observable<DeploymentTemplateSetup> {
    return this.httpClient.get<DeploymentTemplateSetup>(this.DEPLOYMENT_TEMPLATE_SETUP_RESOURCE_URI + `${id}`);
  }

  public createDeploymentOrder(deployment: Deployment): Observable<Deployment> {
    const propertiesToIgnore = ['selected'];
    const replacer = (key: any, value: any) => {
      return propertiesToIgnore.indexOf(key) > -1 ? undefined : value;
    };

    console.log(JSON.stringify(deployment, replacer));

    return this.httpClient.post<Deployment>(this.DEPLOYMENT_ORDER_RESOURCE_URI,
      JSON.stringify(deployment, replacer));
  }

}
