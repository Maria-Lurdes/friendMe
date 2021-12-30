import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title: string = 'friendMe';
    showHeader: boolean = false;

    constructor(private router: Router) {
        this.checkPath();
        this.checkInternetConnection();
    }

    checkPath() {
        if (window.location.pathname === '/signin' ||
            window.location.pathname === '/signup' ||
            window.location.pathname === '/forget-password') {
            this.showHeader = false;
        }
    }

    checkInternetConnection() {
        if (!window.navigator.onLine) {
            this.router.navigate(['/offline']);
        }
    }
}
