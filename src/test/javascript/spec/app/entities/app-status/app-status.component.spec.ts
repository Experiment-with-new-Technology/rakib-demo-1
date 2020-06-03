import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlogTestModule } from '../../../test.module';
import { AppStatusComponent } from 'app/entities/app-status/app-status.component';
import { AppStatusService } from 'app/entities/app-status/app-status.service';
import { AppStatus } from 'app/shared/model/app-status.model';

describe('Component Tests', () => {
  describe('AppStatus Management Component', () => {
    let comp: AppStatusComponent;
    let fixture: ComponentFixture<AppStatusComponent>;
    let service: AppStatusService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [AppStatusComponent],
      })
        .overrideTemplate(AppStatusComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AppStatusComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AppStatusService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AppStatus(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.appStatuses && comp.appStatuses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
