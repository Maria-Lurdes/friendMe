import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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
import { OfflinePageComponent } from './offline-page/offline-page.component';
import {SharedModule} from "./shared/shared.module";
import { CreateEditPostModalComponent } from './components/create-edit-post-modal/create-edit-post-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from "@angular/material/select";
@NgModule({
    declarations: [
        AppComponent,
        SignInComponent,
        SignUpComponent,
        ForgetPasswordComponent,
        HeaderComponent,
        OfflinePageComponent,
        CreateEditPostModalComponent
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
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        initializeApp(firebase);
    }
}
