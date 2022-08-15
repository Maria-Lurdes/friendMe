import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ContactModalComponent } from "./contact-modal.component";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "../../shared/services/alert.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("ContactModalComponent", () => {
  let component: ContactModalComponent;
  let fixture: ComponentFixture<ContactModalComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy("close"),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactModalComponent],
      imports: [MatDialogModule, RouterTestingModule, HttpClientTestingModule],
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
