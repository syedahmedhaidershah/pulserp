import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInvItemComponent } from './edit-inv-item.component';

describe('EditInvItemComponent', () => {
  let component: EditInvItemComponent;
  let fixture: ComponentFixture<EditInvItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInvItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInvItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
