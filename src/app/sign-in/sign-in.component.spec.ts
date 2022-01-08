import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ SignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create from with 2 controls ',  () => {
    expect(component.signInForm.contains('email')).toBeTruthy();
    expect(component.signInForm.contains('password')).toBeTruthy();
  });

  it('should mark email as invalid if value will be empty ', () => {
    const control = component.signInForm.get('email');
    control.setValue('');
    expect(control.valid).toBeFalse();
  });
});
