import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { AppStatusUpdateComponent } from 'app/entities/app-status/app-status-update.component';
import { AppStatusService } from 'app/entities/app-status/app-status.service';
import { AppStatus } from 'app/shared/model/app-status.model';

describe('Component Tests', () => {
  describe('AppStatus Management Update Component', () => {
    let comp: AppStatusUpdateComponent;
    let fixture: ComponentFixture<AppStatusUpdateComponent>;
    let service: AppStatusService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [AppStatusUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AppStatusUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AppStatusUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AppStatusService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AppStatus(123);
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
        const entity = new AppStatus();
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
