import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  signUpForm = new FormGroup({
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    firstPassword: new FormControl(''),
    secondPassword: new FormControl(''),
  });

}
