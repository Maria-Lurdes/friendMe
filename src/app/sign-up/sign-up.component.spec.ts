import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import {RouterTestingModule} from "@angular/router/testing";
import {AlertService} from "../shared/services/alert.service";
import {initializeApp} from "firebase/app";
import {firebase} from "../../environments/environment";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [AlertService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    initializeApp(firebase);
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
