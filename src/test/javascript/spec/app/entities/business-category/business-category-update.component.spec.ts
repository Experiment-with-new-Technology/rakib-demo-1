import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { BusinessCategoryUpdateComponent } from 'app/entities/business-category/business-category-update.component';
import { BusinessCategoryService } from 'app/entities/business-category/business-category.service';
import { BusinessCategory } from 'app/shared/model/business-category.model';

describe('Component Tests', () => {
  describe('BusinessCategory Management Update Component', () => {
    let comp: BusinessCategoryUpdateComponent;
    let fixture: ComponentFixture<BusinessCategoryUpdateComponent>;
    let service: BusinessCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [BusinessCategoryUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(BusinessCategoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BusinessCategoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BusinessCategoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new BusinessCategory(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new BusinessCategory();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
