import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ContentTypeInterceptor implements HttpInterceptor {

  public intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {

    httpRequest = httpRequest.clone({
      headers:
        httpRequest.headers.set('Content-Type', 'application/json')
    });

    return httpHandler.handle(httpRequest);
  }

}
