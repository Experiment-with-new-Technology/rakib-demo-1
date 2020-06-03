import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAppStatus, AppStatus } from 'app/shared/model/app-status.model';
import { AppStatusService } from './app-status.service';
import { AppStatusComponent } from './app-status.component';
import { AppStatusDetailComponent } from './app-status-detail.component';
import { AppStatusUpdateComponent } from './app-status-update.component';

@Injectable({ providedIn: 'root' })
export class AppStatusResolve implements Resolve<IAppStatus> {
  constructor(private service: AppStatusService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAppStatus> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((appStatus: HttpResponse<AppStatus>) => {
          if (appStatus.body) {
            return of(appStatus.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AppStatus());
  }
}

export const appStatusRoute: Routes = [
  {
    path: '',
    component: AppStatusComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.appStatus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AppStatusDetailComponent,
    resolve: {
      appStatus: AppStatusResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.appStatus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AppStatusUpdateComponent,
    resolve: {
      appStatus: AppStatusResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.appStatus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AppStatusUpdateComponent,
    resolve: {
      appStatus: AppStatusResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'blogApp.appStatus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
