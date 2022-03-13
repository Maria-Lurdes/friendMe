import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./shared/services/auth.service";
import {AlertService} from "./shared/services/alert.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title: string = 'friendMe';

    constructor(private router: Router, public auth: AuthService, private alert: AlertService) {
        this.checkInternetConnection();
    }

    checkInternetConnection() {
        if (!window.navigator.onLine) {
            this.alert.danger('You are offline')
        }
    }
}
