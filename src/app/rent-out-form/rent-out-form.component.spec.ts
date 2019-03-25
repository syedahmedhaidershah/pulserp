import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentOutFormComponent } from './rent-out-form.component';

describe('RentOutFormComponent', () => {
  let component: RentOutFormComponent;
  let fixture: ComponentFixture<RentOutFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentOutFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentOutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
