import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LoginInfo} from "../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    signInForm: FormGroup;
    message: string;
    hide = true;
    submitted = false;

    constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            if (params['loginAgain']) {
                this.message = 'Login again, token has inspired.'
            }else if(params['authFailed']){
                this.message = 'Session ended, login again.'
            }
        })

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

    async signIn() {
        if (this.signInForm.invalid) return
        const user: LoginInfo = {
            email: this.signInForm.value.email,
            password: this.signInForm.value.password
        }
        await this.auth.signIn(user);
    }

    async googleSignIn() {
        await this.auth.googleSignIn();
    }

    async facebookSignIn() {
        await this.auth.facebookSignIn();
    }

}
