import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAppStatus } from 'app/shared/model/app-status.model';
import { AppStatusService } from './app-status.service';
import { AppStatusDeleteDialogComponent } from './app-status-delete-dialog.component';

@Component({
  selector: 'jhi-app-status',
  templateUrl: './app-status.component.html',
})
export class AppStatusComponent implements OnInit, OnDestroy {
  appStatuses?: IAppStatus[];
  eventSubscriber?: Subscription;

  constructor(protected appStatusService: AppStatusService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.appStatusService.query().subscribe((res: HttpResponse<IAppStatus[]>) => (this.appStatuses = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAppStatuses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAppStatus): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAppStatuses(): void {
    this.eventSubscriber = this.eventManager.subscribe('appStatusListModification', () => this.loadAll());
  }

  delete(appStatus: IAppStatus): void {
    const modalRef = this.modalService.open(AppStatusDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.appStatus = appStatus;
  }
}
