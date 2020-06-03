import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAppStatus } from 'app/shared/model/app-status.model';

type EntityResponseType = HttpResponse<IAppStatus>;
type EntityArrayResponseType = HttpResponse<IAppStatus[]>;

@Injectable({ providedIn: 'root' })
export class AppStatusService {
  public resourceUrl = SERVER_API_URL + 'api/app-statuses';

  constructor(protected http: HttpClient) {}

  create(appStatus: IAppStatus): Observable<EntityResponseType> {
    return this.http.post<IAppStatus>(this.resourceUrl, appStatus, { observe: 'response' });
  }

  update(appStatus: IAppStatus): Observable<EntityResponseType> {
    return this.http.put<IAppStatus>(this.resourceUrl, appStatus, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAppStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAppStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
