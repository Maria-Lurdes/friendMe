import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { deleteObject, getStorage, ref, uploadBytes } from "firebase/storage";
import { PostService } from "../../shared/services/post.service";
import { AlertService } from "../../shared/services/alert.service";
import { Post } from "../../shared/interfaces";

@Component({
  selector: "app-create-edit-post-modal",
  templateUrl: "./create-edit-post-modal.component.html",
  styleUrls: ["./create-edit-post-modal.component.scss"],
})
export class CreateEditPostModalComponent implements OnInit {
  postToEdit: Post;
  petPost: FormGroup;
  submitted = false;
  petAvatar: FileList;
  avatarName: string;
  fireStorage = getStorage();

  constructor(
    public dialogRef: MatDialogRef<CreateEditPostModalComponent>,
    public postService: PostService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.petPost = new FormGroup({
      name: new FormControl(this.postToEdit ? this.postToEdit.name : null, [
        Validators.required,
      ]),
      description: new FormControl(
        this.postToEdit ? this.postToEdit.description : null,
        [Validators.required]
      ),
      age: new FormControl(this.postToEdit ? this.postToEdit.age : null, [
        Validators.required,
      ]),
      sex: new FormControl(this.postToEdit ? this.postToEdit.sex : null, [
        Validators.required,
      ]),
      weight: new FormControl(this.postToEdit ? this.postToEdit.weight : null, [
        Validators.required,
      ]),
      type: new FormControl(this.postToEdit ? this.postToEdit.type : null, [
        Validators.required,
      ]),
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.submitted = true;
    const post: Post = {
      name: this.petPost.value.name,
      description: this.petPost.value.description,
      age: this.petPost.value.age,
      sex: this.petPost.value.sex,
      weight: this.petPost.value.weight,
      type: this.petPost.value.type,
    };

    if (this.postToEdit) {
      this.postService.updatePost(this.postToEdit.id, post).subscribe(() => {
        if (this.avatarName) {
          this.updatePostImage();
        } else {
          this.completeRequest();
        }
      });
    } else {
      this.postService.createPost(post).subscribe(
        (data: Post) => {
          this.uploadImageToStorage(data.id);
        },
        () => (this.submitted = false)
      );
    }
  }

  uploadImageToStorage(id): void {
    const file = this.petAvatar.item(0);
    let url = ref(this.fireStorage, `pets-avatars/${id}`);
    const metadata = {
      contentType: "image/jpeg",
    };

    uploadBytes(url, file, metadata).then(
      () => {
        this.completeRequest();
      },
      () => (this.submitted = false)
    );
  }

  completeRequest(): void {
    this.submitted = false;
    this.petPost.reset();
    this.closeModal();
    this.postService.getAll();
    this.alert.success("Changes are successfully saved!");
  }

  updatePostImage(): void {
    const imageRef = ref(
      this.fireStorage,
      `pets-avatars/${this.postToEdit.id}`
    );
    deleteObject(imageRef)
      .then(() => {
        this.uploadImageToStorage(this.postToEdit.id);
      })
      .catch(() => {
        this.alert.danger("Smth went wrong, try again later");
      });
  }

  setFile(e): void {
    if (e.target.files[0].size > 50000000) {
      this.alert.warning(
        "Your file is bigger than 500ko. Please, choose another one."
      );
    } else {
      this.petAvatar = e.target.files;
      this.avatarName = e.target.files[0].name;
    }
  }

  buttonIsDisabled(): boolean {
    const imageIsNotValid = !this.postToEdit && !this.avatarName;
    return this.petPost.invalid || this.submitted || imageIsNotValid;
  }
}
