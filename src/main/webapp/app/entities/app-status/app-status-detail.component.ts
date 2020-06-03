import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAppStatus } from 'app/shared/model/app-status.model';

@Component({
  selector: 'jhi-app-status-detail',
  templateUrl: './app-status-detail.component.html',
})
export class AppStatusDetailComponent implements OnInit {
  appStatus: IAppStatus | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appStatus }) => (this.appStatus = appStatus));
  }

  previousState(): void {
    window.history.back();
  }
}
