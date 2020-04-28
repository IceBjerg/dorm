import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomBuildingComponent } from './room-building.component';

describe('RoomBuildingComponent', () => {
  let component: RoomBuildingComponent;
  let fixture: ComponentFixture<RoomBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomBuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
