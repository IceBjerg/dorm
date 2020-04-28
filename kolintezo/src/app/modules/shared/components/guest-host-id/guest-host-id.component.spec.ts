import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestHostIdComponent } from './guest-host-id.component';

describe('GuestHostIdComponent', () => {
  let component: GuestHostIdComponent;
  let fixture: ComponentFixture<GuestHostIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestHostIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestHostIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
