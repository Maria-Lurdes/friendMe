import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.scss"],
})
export class ForgetPasswordComponent implements OnInit {
  forgetPassForm = new FormGroup({
    email: new FormControl(""),
  });

  constructor(public auth: AuthService) {}

  ngOnInit(): void {}

  async resetPasswordByEmail() {
    await this.auth.sendPasswordResetEmail(this.forgetPassForm.value.email);
  }
}
