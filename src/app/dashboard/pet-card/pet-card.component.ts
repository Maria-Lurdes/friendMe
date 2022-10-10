import { Component, Input, OnInit } from "@angular/core";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { CreateEditPostModalComponent } from "../create-edit-post-modal/create-edit-post-modal.component";
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from "@angular/material/dialog";
import { PostService } from "../../shared/services/post.service";
import { AuthService } from "../../shared/services/auth.service";
import { AlertService } from "../../shared/services/alert.service";
import { Post } from "../../shared/interfaces";

@Component({
  selector: "app-pet-card",
  templateUrl: "./pet-card.component.html",
  styleUrls: ["./pet-card.component.scss"],
})
export class PetCardComponent implements OnInit {
  @Input()
  petPost: Post;
  @Input()
  userId: string;
  @Input()
  favouritesList: string[] = [];
  isAdmin: boolean = false;
  isFavourite: boolean = false;

  constructor(
    public dialog: MatDialog,
    private postService: PostService,
    private authService: AuthService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem("role") === "admin";
    this.getChosenPosts();
  }

  getChosenPosts(): void {
    this.isFavourite = !!(
      this.favouritesList.length &&
      this.favouritesList.find((id: string) => id === this.petPost.id)
    );
  }

  removePost(): void {
    this.postService.remove(this.petPost.id).subscribe(() => {
      let fireStorage = getStorage();
      const imageRef = ref(fireStorage, `pets-avatars/${this.petPost.id}`);
      deleteObject(imageRef)
        .then(() => {
          this.alert.success("Post was successfully deleted");
          this.postService.getAll();
        })
        .catch(() => {
          this.alert.danger("Smth went wrong, try again later");
        });
    });
  }

  openEditFormModal(): void {
    let config = new MatDialogConfig();
    let dialogRef: MatDialogRef<CreateEditPostModalComponent> =
      this.dialog.open(CreateEditPostModalComponent, config);
    dialogRef.componentInstance.postToEdit = this.petPost;
  }

  addRemoveToFavoirites(): void {
    if (this.isFavourite) {
      this.isFavourite = false;
      let updatedArray = this.favouritesList.filter(
        (id: string) => id !== this.petPost.id
      );
      this.updateLocalStorage(updatedArray);
    } else {
      this.isFavourite = true;
      let updatedArray = [...this.favouritesList];
      updatedArray.push(this.petPost.id);
      this.updateLocalStorage(updatedArray);
    }
  }

  updateLocalStorage(list): void {
    localStorage.removeItem(this.userId);
    localStorage.setItem(this.userId, JSON.stringify(list));
    this.authService.getFavourites();
  }
}
