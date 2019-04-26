import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeploymentTemplateSetup } from '../model/deployment-template-setup';

@Injectable({
  providedIn: 'root'
})
export class DeploymentTemplateSetupService {

  private DEPLOYMENT_TEMPLATE_SETUP_RESOURCE_URI = `${environment.domain}/configuration/deployment-templates`;

  constructor(private httpClient: HttpClient) {
  }

  public saveDeploymentTemplateSetup(deploymentTemplateSetup: DeploymentTemplateSetup): Observable<DeploymentTemplateSetup> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<DeploymentTemplateSetup>(this.DEPLOYMENT_TEMPLATE_SETUP_RESOURCE_URI,
      JSON.stringify(deploymentTemplateSetup), httpOptions);
  }

}
