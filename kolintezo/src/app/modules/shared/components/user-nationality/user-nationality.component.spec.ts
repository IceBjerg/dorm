import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNationalityComponent } from './user-nationality.component';

describe('UserNationalityComponent', () => {
  let component: UserNationalityComponent;
  let fixture: ComponentFixture<UserNationalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNationalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNationalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
