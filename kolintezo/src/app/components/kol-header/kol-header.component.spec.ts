import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KolHeaderComponent } from './kol-header.component';

describe('KolHeaderComponent', () => {
  let component: KolHeaderComponent;
  let fixture: ComponentFixture<KolHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KolHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KolHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
