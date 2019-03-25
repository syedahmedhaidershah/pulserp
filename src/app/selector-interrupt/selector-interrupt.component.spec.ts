import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorInterruptComponent } from './selector-interrupt.component';

describe('SelectorInterruptComponent', () => {
  let component: SelectorInterruptComponent;
  let fixture: ComponentFixture<SelectorInterruptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorInterruptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorInterruptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
