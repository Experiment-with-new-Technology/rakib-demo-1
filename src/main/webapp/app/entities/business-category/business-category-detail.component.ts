import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBusinessCategory } from 'app/shared/model/business-category.model';

@Component({
  selector: 'jhi-business-category-detail',
  templateUrl: './business-category-detail.component.html',
})
export class BusinessCategoryDetailComponent implements OnInit {
  businessCategory: IBusinessCategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ businessCategory }) => (this.businessCategory = businessCategory));
  }

  previousState(): void {
    window.history.back();
  }
}
