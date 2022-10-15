import { Component, OnDestroy, OnInit } from "@angular/core";
import { AlertService } from "../../shared/services/alert.service";
import { PostService } from "../../shared/services/post.service";
import { ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Post } from "../../shared/interfaces";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from "@angular/material/dialog";
import { ContactModalComponent } from "../contact-modal/contact-modal.component";
import { Subscription } from "rxjs";

@Component({
  selector: "app-pet-info",
  templateUrl: "./pet-info.component.html",
  styleUrls: ["./pet-info.component.scss"],
})
export class PetInfoComponent implements OnInit, OnDestroy {
  post: Post;
  offlineMode$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private alert: AlertService,
    private postsService: PostService,
    public dialog: MatDialog,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getPetById();
    this.handleOfflineMode();
  }

  handleOfflineMode(): void {
    this.offlineMode$ = this.postService.offlineMode$.subscribe(
      (offlineMode: boolean) => {
        if (offlineMode && !this.post.name) {
          this.getPetById();
        }
      }
    );
  }

  getPetById(): void {
    try {
      this.route.params
        .pipe(
          switchMap((params: Params) => {
            return this.postsService.getById(params["id"]);
          })
        )
        .subscribe((post: Post) => {
          this.post = post;
          this.getImageUrl();
        });
    } catch {
      this.post = {
        age: 0,
        description: "",
        name: "",
        sex: "",
        type: "",
        weight: 0,
        avatar: "",
      };
    }
  }

  getImageUrl(): void {
    let fireStorage = getStorage();
    const pathRef = ref(fireStorage, `pets-avatars/${this.post.id}`);
    getDownloadURL(pathRef).then(
      (url: string) => {
        this.post.avatar = url;
      },
      () => {
        this.post.avatar = "";
      }
    );
  }

  openContactFormModal(type: string): void {
    let config = new MatDialogConfig();
    let dialogRef: MatDialogRef<ContactModalComponent> = this.dialog.open(
      ContactModalComponent,
      config
    );
    dialogRef.componentInstance.petId = this.post.id;
    dialogRef.componentInstance.type = type;
  }

  ngOnDestroy(): void {
    this.offlineMode$.unsubscribe();
  }
}
