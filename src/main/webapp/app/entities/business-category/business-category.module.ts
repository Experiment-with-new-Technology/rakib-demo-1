import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from 'app/shared/shared.module';
import { BusinessCategoryComponent } from './business-category.component';
import { BusinessCategoryDetailComponent } from './business-category-detail.component';
import { BusinessCategoryUpdateComponent } from './business-category-update.component';
import { BusinessCategoryDeleteDialogComponent } from './business-category-delete-dialog.component';
import { businessCategoryRoute } from './business-category.route';

@NgModule({
  imports: [BlogSharedModule, RouterModule.forChild(businessCategoryRoute)],
  declarations: [
    BusinessCategoryComponent,
    BusinessCategoryDetailComponent,
    BusinessCategoryUpdateComponent,
    BusinessCategoryDeleteDialogComponent,
  ],
  entryComponents: [BusinessCategoryDeleteDialogComponent],
})
export class BlogBusinessCategoryModule {}
