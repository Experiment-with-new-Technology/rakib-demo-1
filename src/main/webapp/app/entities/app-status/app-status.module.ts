import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from 'app/shared/shared.module';
import { AppStatusComponent } from './app-status.component';
import { AppStatusDetailComponent } from './app-status-detail.component';
import { AppStatusUpdateComponent } from './app-status-update.component';
import { AppStatusDeleteDialogComponent } from './app-status-delete-dialog.component';
import { appStatusRoute } from './app-status.route';

@NgModule({
  imports: [BlogSharedModule, RouterModule.forChild(appStatusRoute)],
  declarations: [AppStatusComponent, AppStatusDetailComponent, AppStatusUpdateComponent, AppStatusDeleteDialogComponent],
  entryComponents: [AppStatusDeleteDialogComponent],
})
export class BlogAppStatusModule {}
