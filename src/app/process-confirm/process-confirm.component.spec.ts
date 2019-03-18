import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessConfirmComponent } from './process-confirm.component';

describe('ProcessConfirmComponent', () => {
  let component: ProcessConfirmComponent;
  let fixture: ComponentFixture<ProcessConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
