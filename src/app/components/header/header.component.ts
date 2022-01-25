import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CreateEditPostModalComponent} from "../create-edit-post-modal/create-edit-post-modal.component";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(public dialog: MatDialog, public auth: AuthService, private router: Router) {
    }

    ngOnInit(): void {
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
