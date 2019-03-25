import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemsInteractiveComponent } from './inventory-items-interactive.component';

describe('InventoryItemsInteractiveComponent', () => {
  let component: InventoryItemsInteractiveComponent;
  let fixture: ComponentFixture<InventoryItemsInteractiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryItemsInteractiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemsInteractiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
