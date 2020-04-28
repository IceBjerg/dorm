import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportNeedTranslateComponent } from './report-need-translate.component';

describe('ReportNeedTranslateComponent', () => {
  let component: ReportNeedTranslateComponent;
  let fixture: ComponentFixture<ReportNeedTranslateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportNeedTranslateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportNeedTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
