import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { PostService } from "../../shared/services/post.service";
import { Post } from "../../shared/interfaces";

import { AuthService } from "../../shared/services/auth.service";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { MatPaginator } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import firebase from "firebase/compat";
import User = firebase.User;

export type PetSortingType = "all" | "cat" | "dog" | "horse";

@Component({
  selector: "app-pets-list",
  templateUrl: "./pets-list.component.html",
  styleUrls: ["./pets-list.component.scss"],
})
export class PetsListComponent implements OnInit, OnDestroy {
  @ViewChild("paginator") paginator: MatPaginator | undefined;

  posts: Post[] = [];
  filterPetByType: PetSortingType = "all";
  userId: string = "";
  auth = getAuth();
  favouritesList: string[] = [];
  pageIndex: number = 0;
  pageSize: number = 12;
  lowValue: number = 0;
  highValue: number = 12;
  loader: boolean = true;
  petPostsArray$: Subscription;
  favouritesPetsList$: Subscription;
  offlineMode$: Subscription;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.handleOfflineMode();
    this.getChosenPets();
    this.getAllPets();
    this.getCurrentPosts();
    this.getUserId();
    this.getFavouritePetsList();
  }

  handleOfflineMode(): void {
    this.offlineMode$ = this.postService.offlineMode$.subscribe(
      (offlineMode: boolean) => {
        if (!offlineMode && !this.posts.length) {
          this.getChosenPets();
          this.getAllPets();
        }
      }
    );
  }

  getFavouritePetsList(): void {
    this.favouritesPetsList$ = this.authService.favouritesPetsList$.subscribe(
      (list: string[]) => {
        this.favouritesList = list;
      }
    );
  }

  getUserId(): void {
    onAuthStateChanged(this.auth, (user: User) => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  getChosenPets(): void {
    this.authService.getFavourites();
  }

  getCurrentPosts(): void {
    this.petPostsArray$ = this.postService.petPostsArray$.subscribe(
      (currentPosts: Post[]) => {
        this.loader = false;
        this.posts = this.getPostsByColor(currentPosts);
      },
      () => {
        this.loader = false;
      }
    );
  }

  getAllPets(): void {
    this.postService.getAll();
  }

  getPostsByColor(posts): Post[] {
    const updatedPosts = [];
    posts.forEach((item: Post, index: number) => {
      let postItem = { ...item };
      if (index === 0) {
        postItem = { ...postItem, color: "green" };
      } else {
        if (updatedPosts[updatedPosts.length - 1].color === "green") {
          postItem = { ...postItem, color: "orange" };
        } else if (updatedPosts[updatedPosts.length - 1].color === "orange") {
          postItem = { ...postItem, color: "blue" };
        } else if (updatedPosts[updatedPosts.length - 1].color === "blue") {
          postItem = { ...postItem, color: "green" };
        }
      }
      updatedPosts.push(postItem);
    });

    return updatedPosts;
  }

  getPaginatorData(event: { pageIndex: number }): void {
    if (event.pageIndex === this.pageIndex + 1) {
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue = this.highValue + this.pageSize;
    } else if (event.pageIndex === this.pageIndex - 1 && this.lowValue > 0) {
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue = this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
  }

  handleFilterAndPagination(type: PetSortingType): void {
    this.lowValue = 0;
    this.highValue = 12;
    this.paginator?.firstPage();
    this.filterPetByType = type;
  }

  ngOnDestroy(): void {
    this.petPostsArray$.unsubscribe();
    this.favouritesPetsList$.unsubscribe();
    this.offlineMode$.unsubscribe();
  }
}
