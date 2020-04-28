import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestGuestNameComponent } from './guest-guest-name.component';

describe('GuestGuestNameComponent', () => {
  let component: GuestGuestNameComponent;
  let fixture: ComponentFixture<GuestGuestNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestGuestNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestGuestNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
