import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPasswordAgainComponent } from './user-password-again.component';

describe('UserPasswordAgainComponent', () => {
  let component: UserPasswordAgainComponent;
  let fixture: ComponentFixture<UserPasswordAgainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPasswordAgainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPasswordAgainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
