import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnRoomComponent } from './own-room.component';

describe('OwnRoomComponent', () => {
  let component: OwnRoomComponent;
  let fixture: ComponentFixture<OwnRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
