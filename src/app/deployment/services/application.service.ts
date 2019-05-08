import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationSetup } from '../model/application-setup';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Application } from '../model/application';

@Injectable()
export class ApplicationService {

  private APPLICATION_SETUP_RESOURCE_URI = `${environment.domain}/configuration/applications`;

  constructor(private httpClient: HttpClient) {
  }

  public save(application: Application): Observable<Application> {
    return this.httpClient.post<Application>(this.APPLICATION_SETUP_RESOURCE_URI,
      JSON.stringify(application));
  }

  public getApplications(): Observable<ApplicationSetup[]> {
    return this.httpClient.get<ApplicationSetup[]>(this.APPLICATION_SETUP_RESOURCE_URI);
  }

  public getApplicationById(id: string): Observable<ApplicationSetup> {
    return this.httpClient.get<ApplicationSetup>(this.APPLICATION_SETUP_RESOURCE_URI + `/${id}`);
  }

}
