import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCapacityComponent } from './room-capacity.component';

describe('RoomCapacityComponent', () => {
  let component: RoomCapacityComponent;
  let fixture: ComponentFixture<RoomCapacityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomCapacityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
