import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SignInComponent } from "./sign-in.component";
import { RouterTestingModule } from "@angular/router/testing";
import { AlertService } from "../shared/services/alert.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { initializeApp } from "firebase/app";
import { firebase } from "../../environments/environment";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("SignInComponent", () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [SignInComponent],
      providers: [AlertService],
    }).compileComponents();
  }));

  beforeEach(() => {
    initializeApp(firebase);
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should create from with 2 controls ", () => {
    expect(component.signInForm.contains("email")).toBeTruthy();
    expect(component.signInForm.contains("password")).toBeTruthy();
  });

  it("should mark email as invalid if value will be empty ", () => {
    const control = component.signInForm.get("email");
    control.setValue("");
    expect(control.valid).toBeFalse();
  });
});
