import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlogTestModule } from '../../../test.module';
import { BusinessCategoryComponent } from 'app/entities/business-category/business-category.component';
import { BusinessCategoryService } from 'app/entities/business-category/business-category.service';
import { BusinessCategory } from 'app/shared/model/business-category.model';

describe('Component Tests', () => {
  describe('BusinessCategory Management Component', () => {
    let comp: BusinessCategoryComponent;
    let fixture: ComponentFixture<BusinessCategoryComponent>;
    let service: BusinessCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [BusinessCategoryComponent],
      })
        .overrideTemplate(BusinessCategoryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BusinessCategoryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BusinessCategoryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new BusinessCategory(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.businessCategories && comp.businessCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
