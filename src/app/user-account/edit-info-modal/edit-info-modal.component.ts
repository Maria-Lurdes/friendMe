import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {UserAuthInfo} from "../../shared/interfaces";
import {AuthService} from "../../shared/services/auth.service";
import {getAuth, onAuthStateChanged} from "firebase/auth";

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
    user: UserAuthInfo;
    firebasAuth = getAuth();

    constructor(public dialogRef: MatDialogRef<EditInfoModalComponent>,
                public auth: AuthService) {
    }

    ngOnInit(): void {
        onAuthStateChanged(this.firebasAuth, (user) => {
            if (user) {
                this.user = user;
                this.updatedInfo = new FormGroup({
                    email: new FormControl(this.user.email, [
                        Validators.required,
                        Validators.email
                    ]),
                    displayName: new FormControl(this.user.displayName, [
                        Validators.required,
                    ])
                })
            }
        });
    }

    closeModal() {
        this.dialogRef.close();
    }

    async submit() {
        await this.auth.updateUserProfile({
            email: this.updatedInfo.value.email,
            displayName: this.updatedInfo.value.displayName
        });
        this.closeModal();
    }

}
