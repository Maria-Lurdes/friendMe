import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {User} from "../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    signInForm: FormGroup;
    hide = true;
    submitted = false;

    constructor(public auth: AuthService, private router: Router) {
    }

    ngOnInit(): void {
        this.signInForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6)
            ])
        })
    }

    signIn() {
        if (this.signInForm.invalid) return

        const user: User = {
            email: this.signInForm.value.email,
            password: this.signInForm.value.password
        }

        this.submitted = true;

        this.auth.signIn(user).subscribe(() => {
            this.signInForm.reset()
            this.router.navigate(['/pets-dashboard'])
            this.submitted = false;
        }, () => {
            this.submitted = false
        })

    }

}
