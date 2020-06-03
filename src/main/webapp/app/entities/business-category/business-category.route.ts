import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBusinessCategory, BusinessCategory } from 'app/shared/model/business-category.model';
import { BusinessCategoryService } from './business-category.service';
import { BusinessCategoryComponent } from './business-category.component';
import { BusinessCategoryDetailComponent } from './business-category-detail.component';
import { BusinessCategoryUpdateComponent } from './business-category-update.component';

@Injectable({ providedIn: 'root' })
export class BusinessCategoryResolve implements Resolve<IBusinessCategory> {
  constructor(private service: BusinessCategoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBusinessCategory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((businessCategory: HttpResponse<BusinessCategory>) => {
          if (businessCategory.body) {
            return of(businessCategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BusinessCategory());
  }
}

export const businessCategoryRoute: Routes = [
  {
    path: '',
    component: BusinessCategoryComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.businessCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BusinessCategoryDetailComponent,
    resolve: {
      businessCategory: BusinessCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.businessCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BusinessCategoryUpdateComponent,
    resolve: {
      businessCategory: BusinessCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.businessCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BusinessCategoryUpdateComponent,
    resolve: {
      businessCategory: BusinessCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.businessCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
