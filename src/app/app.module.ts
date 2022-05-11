import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import { initializeApp } from "firebase/app";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SignInComponent} from './sign-in/sign-in.component';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ForgetPasswordComponent} from './forget-password/forget-password.component';
import {HeaderComponent} from './components/header/header.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment, firebase} from '../environments/environment';
import {SharedModule} from "./shared/shared.module";
import { CreateEditPostModalComponent } from './components/create-edit-post-modal/create-edit-post-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from "@angular/material/select";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./shared/services/auth.interceptor";
import {AlertService} from "./shared/services/alert.service";
import {AlertComponent} from "./components/alert/alert.component";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { EditInfoModalComponent } from './user-account/edit-info-modal/edit-info-modal.component';

const INTERCEPTOR_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterceptor
}

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
        EditInfoModalComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        SharedModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            registrationStrategy: 'registerWhenStable:30000'
        }),
        MatSelectModule,
        MatSnackBarModule
    ],
    providers: [INTERCEPTOR_PROVIDER, AlertService],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        initializeApp(firebase);
    }
}
