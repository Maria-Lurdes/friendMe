import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateEditPostModalComponent } from "./create-edit-post-modal.component";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "../../shared/services/alert.service";
import { initializeApp } from "firebase/app";
import { firebase } from "../../../environments/environment";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSelectModule } from "@angular/material/select";

describe("CreateEditPostModalComponent", () => {
  let component: CreateEditPostModalComponent;
  let fixture: ComponentFixture<CreateEditPostModalComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy("close"),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditPostModalComponent],
      imports: [
        MatDialogModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSelectModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        AlertService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    initializeApp(firebase);
    fixture = TestBed.createComponent(CreateEditPostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
