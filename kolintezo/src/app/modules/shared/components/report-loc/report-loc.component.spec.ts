import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLocComponent } from './report-loc.component';

describe('ReportLocComponent', () => {
  let component: ReportLocComponent;
  let fixture: ComponentFixture<ReportLocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportLocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
