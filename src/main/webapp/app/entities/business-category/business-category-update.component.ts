import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IBusinessCategory, BusinessCategory } from 'app/shared/model/business-category.model';
import { BusinessCategoryService } from './business-category.service';

@Component({
  selector: 'jhi-business-category-update',
  templateUrl: './business-category-update.component.html',
})
export class BusinessCategoryUpdateComponent implements OnInit {
  isSaving = false;
  parentcategories: IBusinessCategory[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    parentCategory: [],
  });

  constructor(
    protected businessCategoryService: BusinessCategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ businessCategory }) => {
      this.updateForm(businessCategory);

      this.businessCategoryService
        .query({ filter: 'businesscategory-is-null' })
        .pipe(
          map((res: HttpResponse<IBusinessCategory[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IBusinessCategory[]) => {
          if (!businessCategory.parentCategory || !businessCategory.parentCategory.id) {
            this.parentcategories = resBody;
          } else {
            this.businessCategoryService
              .find(businessCategory.parentCategory.id)
              .pipe(
                map((subRes: HttpResponse<IBusinessCategory>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IBusinessCategory[]) => (this.parentcategories = concatRes));
          }
        });
    });
  }

  updateForm(businessCategory: IBusinessCategory): void {
    this.editForm.patchValue({
      id: businessCategory.id,
      name: businessCategory.name,
      parentCategory: businessCategory.parentCategory,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const businessCategory = this.createFromForm();
    if (businessCategory.id !== undefined) {
      this.subscribeToSaveResponse(this.businessCategoryService.update(businessCategory));
    } else {
      this.subscribeToSaveResponse(this.businessCategoryService.create(businessCategory));
    }
  }

  private createFromForm(): IBusinessCategory {
    return {
      ...new BusinessCategory(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      parentCategory: this.editForm.get(['parentCategory'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBusinessCategory>>): void {
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

  trackById(index: number, item: IBusinessCategory): any {
    return item.id;
  }
}
