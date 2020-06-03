import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { BusinessCategoryDetailComponent } from 'app/entities/business-category/business-category-detail.component';
import { BusinessCategory } from 'app/shared/model/business-category.model';

describe('Component Tests', () => {
  describe('BusinessCategory Management Detail Component', () => {
    let comp: BusinessCategoryDetailComponent;
    let fixture: ComponentFixture<BusinessCategoryDetailComponent>;
    const route = ({ data: of({ businessCategory: new BusinessCategory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [BusinessCategoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BusinessCategoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BusinessCategoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load businessCategory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.businessCategory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
