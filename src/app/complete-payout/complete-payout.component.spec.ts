import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletePayoutComponent } from './complete-payout.component';

describe('CompletePayoutComponent', () => {
  let component: CompletePayoutComponent;
  let fixture: ComponentFixture<CompletePayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletePayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletePayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
