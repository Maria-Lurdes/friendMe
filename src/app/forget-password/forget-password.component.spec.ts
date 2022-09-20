import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ForgetPasswordComponent } from "./forget-password.component";
import { AlertService } from "../shared/services/alert.service";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { initializeApp } from "firebase/app";
import { firebase } from "../../environments/environment";

describe("ForgetPasswordComponent", () => {
  let component: ForgetPasswordComponent;
  let fixture: ComponentFixture<ForgetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgetPasswordComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AlertService],
    }).compileComponents();
  }));

  beforeEach(() => {
    initializeApp(firebase);
    fixture = TestBed.createComponent(ForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
