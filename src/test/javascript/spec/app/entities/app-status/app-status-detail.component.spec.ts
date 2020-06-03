import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { AppStatusDetailComponent } from 'app/entities/app-status/app-status-detail.component';
import { AppStatus } from 'app/shared/model/app-status.model';

describe('Component Tests', () => {
  describe('AppStatus Management Detail Component', () => {
    let comp: AppStatusDetailComponent;
    let fixture: ComponentFixture<AppStatusDetailComponent>;
    const route = ({ data: of({ appStatus: new AppStatus(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [AppStatusDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AppStatusDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AppStatusDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load appStatus on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.appStatus).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
