import { Component, OnDestroy, OnInit } from "@angular/core";
import { Post } from "../../shared/interfaces";
import { PostService } from "../../shared/services/post.service";
import { AuthService } from "../../shared/services/auth.service";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Subscription } from "rxjs";

@Component({
  selector: "app-favourites-pets",
  templateUrl: "./favourites-pets.component.html",
  styleUrls: ["./favourites-pets.component.scss"],
})
export class FavouritesPetsComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  allPetsPosts: Post[] = [];
  favouritesList: string[] = [];
  userId: string = "";
  auth = getAuth();
  filterPetByType = "all";
  showLoader = true;
  favouritesPetsList$: Subscription;
  petPostsArray$: Subscription;
  offlineMode$: Subscription;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.handleOfflineMode();
    this.getAllPets();
    this.getFavouritesPosts();
    this.getChosenPets();
    this.getFavouritePetsList();
    this.getUserId();
  }

  handleOfflineMode(): void {
    this.offlineMode$ = this.postService.offlineMode$.subscribe(
      (offlineMode: boolean) => {
        if (!offlineMode && !this.allPetsPosts.length) {
          this.getChosenPets();
          this.getAllPets();
        }
      }
    );
  }

  getAllPets(): void {
    this.postService.getAll();
  }

  getFavouritePetsList(): void {
    this.favouritesPetsList$ = this.authService.favouritesPetsList$.subscribe(
      (list: string[]) => {
        this.showLoader = !!list.length;
        this.favouritesList = list;
        this.findFavouritesInfo();
      }
    );
  }

  findFavouritesInfo(): void {
    let filteredPosts = this.allPetsPosts.filter((post: Post) =>
      this.favouritesList.includes(post.id)
    );
    this.posts = this.getPostsByColor(filteredPosts);
    this.showLoader = false;
  }

  getFavouritesPosts(): void {
    this.petPostsArray$ = this.postService.petPostsArray$.subscribe(
      (currentPosts: Post[]) => {
        this.allPetsPosts = currentPosts;
        this.findFavouritesInfo();
      },
      () => {
        this.showLoader = false;
      }
    );
  }

  getPostsByColor(posts): Post[] {
    let updatedPosts = [];
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

  getChosenPets(): void {
    this.authService.getFavourites();
  }

  getUserId(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  ngOnDestroy(): void {
    this.petPostsArray$.unsubscribe();
    this.favouritesPetsList$.unsubscribe();
    this.offlineMode$.unsubscribe();
  }
}
