import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Application } from '../model/application';

@Injectable()
export class ApplicationService {

  private APPLICATION_SETUP_RESOURCE_URI = `${environment.rd_api}/configuration/applications`;

  constructor(private httpClient: HttpClient) {
  }

  public save(application: Application): Observable<Application> {
    return this.httpClient.post<Application>(this.APPLICATION_SETUP_RESOURCE_URI,
      JSON.stringify(application));
  }

  public getAll(): Observable<Application[]> {
    return this.httpClient.get<Application[]>(this.APPLICATION_SETUP_RESOURCE_URI);
  }

  public getById(id: string): Observable<Application> {
    return this.httpClient.get<Application>(this.APPLICATION_SETUP_RESOURCE_URI + `/${id}`);
  }

}
