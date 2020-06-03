import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBusinessCategory } from 'app/shared/model/business-category.model';
import { BusinessCategoryService } from './business-category.service';

@Component({
  templateUrl: './business-category-delete-dialog.component.html',
})
export class BusinessCategoryDeleteDialogComponent {
  businessCategory?: IBusinessCategory;

  constructor(
    protected businessCategoryService: BusinessCategoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.businessCategoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('businessCategoryListModification');
      this.activeModal.close();
    });
  }
}
