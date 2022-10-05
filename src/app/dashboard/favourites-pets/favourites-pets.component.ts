import { Component, OnInit } from "@angular/core";
import { Post } from "../../shared/interfaces";
import { PostService } from "../../shared/services/post.service";
import { AuthService } from "../../shared/services/auth.service";
import { getAuth, onAuthStateChanged } from "firebase/auth";

@Component({
  selector: "app-favourites-pets",
  templateUrl: "./favourites-pets.component.html",
  styleUrls: ["./favourites-pets.component.scss"],
})
export class FavouritesPetsComponent implements OnInit {
  posts: Post[] = [];
  allPetsPosts: Post[] = [];
  favouritesList: string[] = [];
  userId: string = "";
  auth = getAuth();
  filterPetByType = "all";
  showLoader = true;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllPets();
    this.getFavouritesPosts();
    this.getChosenPets();
    this.getFavouritePetsList();
    this.getUserId();
  }

  getAllPets() {
    this.postService.getAll();
  }

  getFavouritePetsList() {
    this.authService.favouritesPetsList.subscribe((list) => {
      this.showLoader = !!list.length;
      this.favouritesList = list;
      this.findFavouritesInfo();
    });
  }

  findFavouritesInfo() {
    let filteredPosts = this.allPetsPosts.filter((post) =>
      this.favouritesList.includes(post.id)
    );
    this.posts = this.getPostsByColor(filteredPosts);
    this.showLoader = false;
  }

  getFavouritesPosts() {
    this.postService.petPostsArray$.subscribe(
      (currentPosts) => {
        this.allPetsPosts = currentPosts;
        this.findFavouritesInfo();
      },
      () => {
        this.showLoader = false;
      }
    );
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

  getChosenPets() {
    this.authService.getFavourites();
  }

  getUserId() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }
}
