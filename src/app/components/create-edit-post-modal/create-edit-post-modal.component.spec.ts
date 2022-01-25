import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditPostModalComponent } from './create-edit-post-modal.component';

describe('CreateEditPostModalComponent', () => {
  let component: CreateEditPostModalComponent;
  let fixture: ComponentFixture<CreateEditPostModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditPostModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditPostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
