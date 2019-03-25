import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvItemComponent } from './add-inv-item.component';

describe('AddInvItemComponent', () => {
  let component: AddInvItemComponent;
  let fixture: ComponentFixture<AddInvItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInvItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInvItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
