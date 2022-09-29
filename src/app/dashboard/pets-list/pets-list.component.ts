import { Component, OnInit, ViewChild } from "@angular/core";
import { PostService } from "../../shared/services/post.service";
import { Post } from "../../shared/interfaces";

import { AuthService } from "../../shared/services/auth.service";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { MatPaginator } from "@angular/material/paginator";

export type PetSortingType = "all" | "cat" | "dog" | "horse";

@Component({
  selector: "app-pets-list",
  templateUrl: "./pets-list.component.html",
  styleUrls: ["./pets-list.component.scss"],
})
export class PetsListComponent implements OnInit {
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

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getChosenPets();
    this.getAllPets();
    this.getCurrentPosts();
    this.getUserId();
    this.getFavouritePetsList();
  }

  getFavouritePetsList() {
    this.authService.favouritesPetsList.subscribe((list) => {
      this.favouritesList = list;
    });
  }

  getUserId() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  getChosenPets() {
    this.authService.getFavourites();
  }

  getCurrentPosts() {
    this.postService.petPostsArray.subscribe(
      (currentPosts) => {
        this.loader = false;
        this.posts = this.getPostsByColor(currentPosts);
      },
      () => {
        this.loader = false;
      }
    );
  }

  getAllPets() {
    this.postService.getAll();
  }

  getPostsByColor(posts) {
    let updatedPosts = [];
    posts.forEach((item, index) => {
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

  getPaginatorData(event: { pageIndex: number }) {
    if (event.pageIndex === this.pageIndex + 1) {
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue = this.highValue + this.pageSize;
    } else if (event.pageIndex === this.pageIndex - 1 && this.lowValue > 0) {
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue = this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
  }

  handleFilterAndPagination(type: PetSortingType) {
    this.lowValue = 0;
    this.highValue = 12;
    this.paginator?.firstPage();
    this.filterPetByType = type;
  }
}
