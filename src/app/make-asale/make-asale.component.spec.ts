import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeASaleComponent } from './make-asale.component';

describe('MakeASaleComponent', () => {
  let component: MakeASaleComponent;
  let fixture: ComponentFixture<MakeASaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeASaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeASaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
