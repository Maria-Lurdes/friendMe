import { Component, OnInit } from "@angular/core";
import { Post } from "../../shared/interfaces";
import { PostService } from "../../shared/services/post.service";
import { AuthService } from "../../shared/services/auth.service";
import { AlertService } from "../../shared/services/alert.service";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

@Component({
  selector: "app-favourites-pets",
  templateUrl: "./favourites-pets.component.html",
  styleUrls: ["./favourites-pets.component.scss"],
})
export class FavouritesPetsComponent implements OnInit {
  posts: Post[] = [];
  favouritesList: string[] = [];
  userId: string = "";
  auth = getAuth();
  filterPetByType = "all";
  showLoader = true;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.getChosenPets();
    this.getFavouritePetsList();
    this.getUserId();
  }

  getFavouritePetsList() {
    this.authService.favouritesPetsList.subscribe((list) => {
      this.showLoader = !!list.length;
      this.favouritesList = list;
      this.posts = [];
      let favouritePosts = [];
      let countIndex = 0;
      const promises = this.favouritesList.map((id) =>
        this.postService.getById(id)
      );
      // @ts-ignore
      Promise.allSettled(promises).then((results) => {
        results.forEach((result) => {
          if (result.status === "fulfilled") {
            result.value.subscribe((val) => {
              if (val.name) {
                let petPost = { ...val };
                if (countIndex === 0) {
                  petPost = { ...petPost, color: "green" };
                } else {
                  if (
                    favouritePosts[favouritePosts.length - 1].color === "green"
                  ) {
                    petPost = { ...petPost, color: "orange" };
                  } else if (
                    favouritePosts[favouritePosts.length - 1].color === "orange"
                  ) {
                    petPost = { ...petPost, color: "blue" };
                  } else if (
                    favouritePosts[favouritePosts.length - 1].color === "blue"
                  ) {
                    petPost = { ...petPost, color: "green" };
                  }
                }
                countIndex++;
                favouritePosts.push(petPost);
                this.posts = favouritePosts;
              }
            });
          }
        });
      });
      this.getImagesUrl();
    });
  }

  getImagesUrl() {
    let fireStorage = getStorage();
    const listRef = ref(fireStorage, `pets-avatars`);
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            let index = this.posts.findIndex(
              (post) => post.id === itemRef.name
            );
            if (index >= 0) this.posts[index].avatar = url;
          });
        });
        this.showLoader = false;
      })
      .catch(() => {
        this.alert.danger("Smth went wrong, try again later");
      });
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
