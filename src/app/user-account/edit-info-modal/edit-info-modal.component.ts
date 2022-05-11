import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../shared/services/alert.service";
import {AuthService} from "../../shared/services/auth.service";
import {updateProfile, getAuth, User, onAuthStateChanged, updateCurrentUser} from 'firebase/auth';

@Component({
    selector: 'app-edit-info-modal',
    templateUrl: './edit-info-modal.component.html',
    styleUrls: ['./edit-info-modal.component.scss']
})
export class EditInfoModalComponent implements OnInit {

    type: string
    petId: string
    updatedInfo: FormGroup;
    submitted = false;
    auth = getAuth();
    authUser = {};

    constructor(public dialogRef: MatDialogRef<EditInfoModalComponent>,
                public authService: AuthService,
                private alert: AlertService) {
    }

    ngOnInit(): void {
        console.log(this.auth.currentUser, 'current user')
        // this.auth.onAuthStateChanged(user => {
        //     console.log(user, 'user')
        //     if (user) {
        //         // User is signed in.
        //     }
        //     else {
        //         // User is signed out.
        //     }
        // })
    }

    closeModal() {
        this.dialogRef.close();
    }

    async submit() {
        // await updateCurrentUser(this.auth, {displayName: 'test edited'})
    }

}
