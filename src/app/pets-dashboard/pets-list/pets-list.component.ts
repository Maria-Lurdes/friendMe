import { Component, OnInit } from '@angular/core';
import {PostService} from "../../shared/services/post.service";
import {Subscription} from "rxjs";
import {Post} from "../../shared/interfaces";
import { listAll, getDownloadURL, getStorage, ref } from "firebase/storage";

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss']
})
export class PetsListComponent implements OnInit {

  constructor(private postService: PostService) { }

  posts: Post[] = []
  initialPosts: Post[] = []
  postSub: Subscription
  destroySub: Subscription
  imageUrl: string

  ngOnInit(): void {
    this.getAllPets()
  }

  getAllPets() {
    this.postSub = this.postService.getAll().subscribe(posts => {
      this.setPostsByColor(posts);
      // this.posts = posts
      // this.initialPosts = posts
      // this.getImageUrl();
    })
  }

  setPostsByColor(posts) {
    let updatedPosts = [];
    posts.forEach((item, index) => {
      let post = item;
      if (index === 0) {
        post = {...post, color: 'green'};
      } else {
        if (updatedPosts[updatedPosts.length-1].color === 'green') {
          post = {...post, color: 'orange'};
        } else if (updatedPosts[updatedPosts.length-1].color === 'orange') {
          post = {...post, color: 'blue'};
        } else  if (updatedPosts[updatedPosts.length-1].color === 'blue') {
          post = {...post, color: 'green'};
        }
      }
      updatedPosts.push(post);
    })
    this.posts = updatedPosts
    this.initialPosts = updatedPosts
    this.getImageUrl();
  }

  getImageUrl() {
    let fireStorage = getStorage();
    const listRef = ref(fireStorage, `pets-avatars`);
    listAll(listRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
            getDownloadURL(itemRef).then(url => {
              let index = this.posts.findIndex(post => post.id === itemRef.name);
              this.posts[index].avatar = url;
            })
          });
        }).catch((error) => {
          // TODO: error message
    });
  }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe()
    }

    if(this.destroySub){
      this.destroySub.unsubscribe()
    }
  }

}
