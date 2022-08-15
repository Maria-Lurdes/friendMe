import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Provider } from "@angular/core";
import { initializeApp } from "firebase/app";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SignInComponent } from "./sign-in/sign-in.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment, firebase } from "../environments/environment";
import { SharedModule } from "./shared/shared.module";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./shared/services/auth.interceptor";
import { AlertService } from "./shared/services/alert.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { UserAccountComponent } from "./user-account/user-account.component";
import { EditInfoModalComponent } from "./user-account/edit-info-modal/edit-info-modal.component";
import { EditPassModalComponent } from "./user-account/edit-pass-modal/edit-pass-modal.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { CreateEditPostModalComponent } from "./dashboard/create-edit-post-modal/create-edit-post-modal.component";
import { AlertComponent } from "./shared/components/alert/alert.component";
import { ContactModalComponent } from "./dashboard/contact-modal/contact-modal.component";

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ForgetPasswordComponent,
    HeaderComponent,
    CreateEditPostModalComponent,
    AlertComponent,
    ContactModalComponent,
    UserAccountComponent,
    EditInfoModalComponent,
    EditPassModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
      registrationStrategy: "registerWhenStable:30000",
    }),
    MatSelectModule,
    MatSnackBarModule,
  ],
  providers: [INTERCEPTOR_PROVIDER, AlertService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    initializeApp(firebase);
  }
}
