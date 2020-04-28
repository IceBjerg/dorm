import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNeptunComponent } from './user-neptun.component';

describe('UserNeptunComponent', () => {
  let component: UserNeptunComponent;
  let fixture: ComponentFixture<UserNeptunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNeptunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNeptunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
