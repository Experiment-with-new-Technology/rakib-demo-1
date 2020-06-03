import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBusinessCategory } from 'app/shared/model/business-category.model';
import { BusinessCategoryService } from './business-category.service';
import { BusinessCategoryDeleteDialogComponent } from './business-category-delete-dialog.component';

@Component({
  selector: 'jhi-business-category',
  templateUrl: './business-category.component.html',
})
export class BusinessCategoryComponent implements OnInit, OnDestroy {
  businessCategories?: IBusinessCategory[];
  eventSubscriber?: Subscription;

  constructor(
    protected businessCategoryService: BusinessCategoryService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.businessCategoryService.query().subscribe((res: HttpResponse<IBusinessCategory[]>) => (this.businessCategories = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBusinessCategories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBusinessCategory): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBusinessCategories(): void {
    this.eventSubscriber = this.eventManager.subscribe('businessCategoryListModification', () => this.loadAll());
  }

  delete(businessCategory: IBusinessCategory): void {
    const modalRef = this.modalService.open(BusinessCategoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.businessCategory = businessCategory;
  }
}
