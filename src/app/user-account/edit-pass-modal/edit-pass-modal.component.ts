import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-pass-modal',
  templateUrl: './edit-pass-modal.component.html',
  styleUrls: ['./edit-pass-modal.component.scss']
})
export class EditPassModalComponent implements OnInit {

  forgetPassForm = new FormGroup({
    email: new FormControl(''),
  });

  constructor(public auth: AuthService, public dialogRef: MatDialogRef<EditPassModalComponent>) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

  async changePass() {
    await this.auth.sendPasswordResetEmail(this.forgetPassForm.value.email);
    this.closeModal();
  }

}
