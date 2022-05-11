import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfoModalComponent } from './edit-info-modal.component';

describe('EditInfoModalComponent', () => {
  let component: EditInfoModalComponent;
  let fixture: ComponentFixture<EditInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
