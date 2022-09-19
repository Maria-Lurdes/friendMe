import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { UserAuthInfo } from "../../shared/interfaces";
import { AuthService } from "../../shared/services/auth.service";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { AlertService } from "../../shared/services/alert.service";

@Component({
  selector: "app-edit-info-modal",
  templateUrl: "./edit-info-modal.component.html",
  styleUrls: ["./edit-info-modal.component.scss"],
})
export class EditInfoModalComponent implements OnInit {
  type: string;
  updatedInfo: FormGroup;
  submitted = false;
  user: UserAuthInfo;
  firebasAuth = getAuth();
  fireStorage = getStorage();
  userAvatar: FileList;
  avatarName: string;

  constructor(
    public dialogRef: MatDialogRef<EditInfoModalComponent>,
    public auth: AuthService,
    private alert: AlertService
  ) {
    onAuthStateChanged(this.firebasAuth, (user) => {
      if (user) {
        this.user = user;
        this.updatedInfo = new FormGroup({
          email: new FormControl(this.user.email, [
            Validators.required,
            Validators.email,
          ]),
          displayName: new FormControl(this.user.displayName, [
            Validators.required,
          ]),
          photoURL: new FormControl(this.user.photoURL, []),
        });
      }
    });
  }

  ngOnInit(): void {}

  closeModal() {
    this.dialogRef.close();
  }

  updateUserImage() {
    const imageRef = ref(this.fireStorage, `users-avatars/${this.user.uid}`);
    if (this.user.photoURL && !this.user.photoURL.includes("facebook")) {
      deleteObject(imageRef)
        .then(() => {
          this.uploadImageToStorage();
        })
        .catch(() => {
          this.submitted = false;
          this.alert.danger("Smth went wrong, try again later");
        });
    } else {
      this.uploadImageToStorage();
    }
  }

  uploadImageToStorage() {
    const file = this.userAvatar.item(0);
    let url = ref(this.fireStorage, `users-avatars/${this.user.uid}`);
    const metadata = {
      contentType: "image/jpeg",
    };
    uploadBytes(url, file, metadata).then(
      () => {
        getDownloadURL(url).then(async (url) => {
          this.updatedInfo.value.photoURL = url;
          await this.saveNewUserInfo();
        });
      },
      () => (this.submitted = false)
    );
  }

  setFile(e): void {
    if (e.target.files[0].size > 50000000) {
      this.alert.warning(
        "Your file is bigger than 500ko. Please, choose another one."
      );
    } else {
      this.userAvatar = e.target.files;
      this.avatarName = e.target.files[0].name;
    }
  }

  async submit() {
    this.submitted = true;
    if (this.userAvatar && this.userAvatar[0]) {
      this.updateUserImage();
    } else {
      await this.saveNewUserInfo();
    }
  }

  async saveNewUserInfo() {
    await this.auth.updateUserProfile({
      email: this.updatedInfo.value.email,
      displayName: this.updatedInfo.value.displayName,
      photoURL: this.updatedInfo.value.photoURL,
    });
    this.submitted = false;
    this.closeModal();
  }
}
