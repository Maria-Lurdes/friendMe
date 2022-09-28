import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ContactModalComponent } from "./contact-modal.component";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "../../shared/services/alert.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("ContactModalComponent", () => {
  let component: ContactModalComponent;
  let fixture: ComponentFixture<ContactModalComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy("close"),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactModalComponent],
      imports: [
        MatDialogModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
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
    fixture = TestBed.createComponent(ContactModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
