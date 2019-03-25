import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReStockItemComponent } from './re-stock-item.component';

describe('ReStockItemComponent', () => {
  let component: ReStockItemComponent;
  let fixture: ComponentFixture<ReStockItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReStockItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReStockItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
