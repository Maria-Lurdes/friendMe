import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CreateEditPostModalComponent} from "../../../dashboard/create-edit-post-modal/create-edit-post-modal.component";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    isAdmin: boolean = false;

    constructor(public dialog: MatDialog, public auth: AuthService, private router: Router) {
    }

    ngOnInit(): void {
        this.isAdmin = localStorage.getItem('role') === 'admin';
    }

    signOut(event: Event) {
        event.preventDefault();
        this.auth.signOut();
        this.router.navigate(['/signin']);
    }

    openFormModal() {
        this.dialog.open(CreateEditPostModalComponent);
    }

}
