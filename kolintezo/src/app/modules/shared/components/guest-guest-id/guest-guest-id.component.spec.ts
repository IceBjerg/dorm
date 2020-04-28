import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestGuestIdComponent } from './guest-guest-id.component';

describe('GuestGuestIdComponent', () => {
  let component: GuestGuestIdComponent;
  let fixture: ComponentFixture<GuestGuestIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestGuestIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestGuestIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
