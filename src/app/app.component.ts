import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'petAdopt';
    showHeader = true;

    ngOnInit(): void {
        if (window.location.pathname === '/signin' ||
            window.location.pathname === '/signup' ||
            window.location.pathname === '/forget-password') {
          this.showHeader = false;
        }
    }
}
