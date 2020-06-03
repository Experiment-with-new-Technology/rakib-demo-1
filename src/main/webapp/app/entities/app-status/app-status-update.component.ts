import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAppStatus, AppStatus } from 'app/shared/model/app-status.model';
import { AppStatusService } from './app-status.service';

@Component({
  selector: 'jhi-app-status-update',
  templateUrl: './app-status-update.component.html',
})
export class AppStatusUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    status: [],
  });

  constructor(protected appStatusService: AppStatusService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appStatus }) => {
      this.updateForm(appStatus);
    });
  }

  updateForm(appStatus: IAppStatus): void {
    this.editForm.patchValue({
      id: appStatus.id,
      status: appStatus.status,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const appStatus = this.createFromForm();
    if (appStatus.id !== undefined) {
      this.subscribeToSaveResponse(this.appStatusService.update(appStatus));
    } else {
      this.subscribeToSaveResponse(this.appStatusService.create(appStatus));
    }
  }

  private createFromForm(): IAppStatus {
    return {
      ...new AppStatus(),
      id: this.editForm.get(['id'])!.value,
      status: this.editForm.get(['status'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppStatus>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
