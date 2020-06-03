import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IApplication, Application } from 'app/shared/model/application.model';
import { ApplicationService } from './application.service';
import { IAppStatus } from 'app/shared/model/app-status.model';
import { AppStatusService } from 'app/entities/app-status/app-status.service';
import { IBusinessCategory } from 'app/shared/model/business-category.model';
import { BusinessCategoryService } from 'app/entities/business-category/business-category.service';

type SelectableEntity = IAppStatus | IBusinessCategory;

@Component({
  selector: 'jhi-application-update',
  templateUrl: './application-update.component.html',
})
export class ApplicationUpdateComponent implements OnInit {
  isSaving = false;
  appstatuses: IAppStatus[] = [];
  businesscategories: IBusinessCategory[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    version: [],
    status: [],
    businessCategory: [],
  });

  constructor(
    protected applicationService: ApplicationService,
    protected appStatusService: AppStatusService,
    protected businessCategoryService: BusinessCategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ application }) => {
      this.updateForm(application);

      this.appStatusService.query().subscribe((res: HttpResponse<IAppStatus[]>) => (this.appstatuses = res.body || []));

      this.businessCategoryService
        .query()
        .subscribe((res: HttpResponse<IBusinessCategory[]>) => (this.businesscategories = res.body || []));
    });
  }

  updateForm(application: IApplication): void {
    this.editForm.patchValue({
      id: application.id,
      name: application.name,
      version: application.version,
      status: application.status,
      businessCategory: application.businessCategory,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const application = this.createFromForm();
    if (application.id !== undefined) {
      this.subscribeToSaveResponse(this.applicationService.update(application));
    } else {
      this.subscribeToSaveResponse(this.applicationService.create(application));
    }
  }

  private createFromForm(): IApplication {
    return {
      ...new Application(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      version: this.editForm.get(['version'])!.value,
      status: this.editForm.get(['status'])!.value,
      businessCategory: this.editForm.get(['businessCategory'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IApplication>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
