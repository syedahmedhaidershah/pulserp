import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeASaleDialogComponent } from './make-a-sale-dialog.component';

describe('MakeASaleDialogComponent', () => {
  let component: MakeASaleDialogComponent;
  let fixture: ComponentFixture<MakeASaleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeASaleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeASaleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
