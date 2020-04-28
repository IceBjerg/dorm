import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAssignComponent } from './room-assign.component';

describe('RoomAssignComponent', () => {
  let component: RoomAssignComponent;
  let fixture: ComponentFixture<RoomAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
