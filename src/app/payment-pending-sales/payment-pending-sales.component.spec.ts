import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPendingSalesComponent } from './payment-pending-sales.component';

describe('PaymentPendingSalesComponent', () => {
  let component: PaymentPendingSalesComponent;
  let fixture: ComponentFixture<PaymentPendingSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentPendingSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPendingSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
