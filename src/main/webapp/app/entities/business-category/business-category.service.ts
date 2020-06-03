import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBusinessCategory } from 'app/shared/model/business-category.model';

type EntityResponseType = HttpResponse<IBusinessCategory>;
type EntityArrayResponseType = HttpResponse<IBusinessCategory[]>;

@Injectable({ providedIn: 'root' })
export class BusinessCategoryService {
  public resourceUrl = SERVER_API_URL + 'api/business-categories';

  constructor(protected http: HttpClient) {}

  create(businessCategory: IBusinessCategory): Observable<EntityResponseType> {
    return this.http.post<IBusinessCategory>(this.resourceUrl, businessCategory, { observe: 'response' });
  }

  update(businessCategory: IBusinessCategory): Observable<EntityResponseType> {
    return this.http.put<IBusinessCategory>(this.resourceUrl, businessCategory, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBusinessCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBusinessCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
