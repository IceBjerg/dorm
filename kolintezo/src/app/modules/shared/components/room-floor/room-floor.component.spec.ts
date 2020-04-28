import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomFloorComponent } from './room-floor.component';

describe('RoomFloorComponent', () => {
  let component: RoomFloorComponent;
  let fixture: ComponentFixture<RoomFloorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomFloorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
