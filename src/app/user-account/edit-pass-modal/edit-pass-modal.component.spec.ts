import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPassModalComponent } from './edit-pass-modal.component';

describe('EditPassModalComponent', () => {
  let component: EditPassModalComponent;
  let fixture: ComponentFixture<EditPassModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPassModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPassModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
