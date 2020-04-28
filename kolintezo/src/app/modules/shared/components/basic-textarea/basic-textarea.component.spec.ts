import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicTextareaComponent } from './basic-textarea.component';

describe('BasicTextareaComponent', () => {
  let component: BasicTextareaComponent;
  let fixture: ComponentFixture<BasicTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
