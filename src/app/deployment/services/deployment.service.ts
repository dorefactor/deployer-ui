import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeploymentTemplate } from '../model/deployment-template';
import { DeploymentOrder } from '../model/deployment-order';

@Injectable()
export class DeploymentService {

  private DEPLOYMENT_TEMPLATE_SETUP_RESOURCE_URI = `${environment.domain}/configuration/deployment-templates`;
  private DEPLOYMENT_ORDER_RESOURCE_URI = `${environment.domain}/configuration/deployment-orders`;

  constructor(private httpClient: HttpClient) {
  }

  public saveDeploymentTemplateSetup(deploymentTemplateSetup: DeploymentTemplate): Observable<DeploymentTemplate> {
    const propertiesToIgnore = ['selected', 'registry', 'image', 'ports'];
    const replacer = (key: any, value: any) => {
      return propertiesToIgnore.indexOf(key) > -1 ? undefined : value;
    };

    console.log(JSON.stringify(deploymentTemplateSetup, replacer));

    return this.httpClient.post<DeploymentTemplate>(this.DEPLOYMENT_TEMPLATE_SETUP_RESOURCE_URI,
      JSON.stringify(deploymentTemplateSetup, replacer));
  }

  public getDeploymentTemplates(): Observable<DeploymentTemplate[]> {
    return this.httpClient.get<DeploymentTemplate[]>(this.DEPLOYMENT_TEMPLATE_SETUP_RESOURCE_URI);
  }

  public getDeploymentTemplateById(id: string): Observable<DeploymentTemplate> {
    return this.httpClient.get<DeploymentTemplate>(this.DEPLOYMENT_TEMPLATE_SETUP_RESOURCE_URI + `${id}`);
  }

  public createDeploymentOrder(deployment: DeploymentOrder): Observable<DeploymentOrder> {
    const propertiesToIgnore = ['selected'];
    const replacer = (key: any, value: any) => {
      return propertiesToIgnore.indexOf(key) > -1 ? undefined : value;
    };

    console.log(JSON.stringify(deployment, replacer));

    return this.httpClient.post<DeploymentOrder>(this.DEPLOYMENT_ORDER_RESOURCE_URI,
      JSON.stringify(deployment, replacer));
  }

}
