import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsApproveComponent } from './events-approve.component';

describe('EventsApproveComponent', () => {
  let component: EventsApproveComponent;
  let fixture: ComponentFixture<EventsApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
