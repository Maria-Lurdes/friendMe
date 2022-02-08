import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../shared/services/auth.service";
import {User} from "../shared/interfaces";
import {Router} from "@angular/router";


@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    signUpForm: FormGroup;
    submitted = false;

    constructor(public auth: AuthService, private router: Router) {
        this.signUpForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
          displayName: new FormControl(null, [
                Validators.required
            ]),
            firstPassword: new FormControl(null,
                [
                    Validators.required
                ]),
            secondPassword: new FormControl(null, [
                Validators.required
            ]),
        }, this.pwdMatchValidator);
    }

    ngOnInit(): void {
    }

  signUp() {
    if (this.signUpForm.invalid) return

    const user: User = {
      displayName: this.signUpForm.value.displayName,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.firstPassword
    }

    this.submitted = true;

    this.auth.signUp(user).subscribe(() => {
      this.signUpForm.reset()
      this.router.navigate(['/pets-dashboard'])
      this.submitted = false;
    }, () => {
      this.submitted = false
    })

  }

  pwdMatchValidator(c: AbstractControl): { invalid: boolean } {
    if (c.get('firstPassword').value !== c.get('secondPassword').value) {
      c.get('secondPassword').setErrors({'noMatch': true});
      return {invalid: true};
    }
  }

}
