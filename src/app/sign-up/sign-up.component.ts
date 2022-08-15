import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  submitted = false;

  constructor(public auth: AuthService) {
    this.signUpForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        displayName: new FormControl(null, [Validators.required]),
        firstPassword: new FormControl(null, [Validators.required]),
        secondPassword: new FormControl(null, [Validators.required]),
      },
      this.pwdMatchValidator
    );
  }

  ngOnInit(): void {}

  signUp() {
    if (this.signUpForm.invalid) return;
    this.auth.signUpUser(
      this.signUpForm.value.email,
      this.signUpForm.value.firstPassword,
      this.signUpForm.value.displayName
    );
  }

  pwdMatchValidator(c: AbstractControl): { invalid: boolean } {
    if (c.get("firstPassword").value !== c.get("secondPassword").value) {
      c.get("secondPassword").setErrors({ noMatch: true });
      return { invalid: true };
    }
  }
}
