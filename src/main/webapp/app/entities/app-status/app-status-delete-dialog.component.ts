import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAppStatus } from 'app/shared/model/app-status.model';
import { AppStatusService } from './app-status.service';

@Component({
  templateUrl: './app-status-delete-dialog.component.html',
})
export class AppStatusDeleteDialogComponent {
  appStatus?: IAppStatus;

  constructor(protected appStatusService: AppStatusService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.appStatusService.delete(id).subscribe(() => {
      this.eventManager.broadcast('appStatusListModification');
      this.activeModal.close();
    });
  }
}
