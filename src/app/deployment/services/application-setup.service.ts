import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApplicationSetup } from '../model/application-setup';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationSetupService {

  private APPLICATION_SETUP_RESOURCE = `${environment.domain}/application`;

  constructor(private httpClient: HttpClient) {
  }

  public saveApplicationSetup(applicationSetup: ApplicationSetup): Observable<ApplicationSetup> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<ApplicationSetup>(this.APPLICATION_SETUP_RESOURCE,
      JSON.stringify(applicationSetup), httpOptions);
  }

}
