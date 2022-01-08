import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./shared/services/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title: string = 'friendMe';

    constructor(private router: Router, public auth: AuthService) {
        this.checkInternetConnection();
    }

    checkInternetConnection() {
        if (!window.navigator.onLine) {
            this.router.navigate(['/offline']);
        }
    }
}
