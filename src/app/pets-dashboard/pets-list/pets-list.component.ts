import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PostService} from "../../shared/services/post.service";
import {Subscription} from "rxjs";
import {Post} from "../../shared/interfaces";
import {getDownloadURL, getStorage, listAll, ref} from "firebase/storage";

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss']
})
export class PetsListComponent implements OnInit {

  constructor(private postService: PostService) { }

  @ViewChild('cat', { read: ElementRef, static:false }) cat: ElementRef;
  @ViewChild('dog', { read: ElementRef, static:false }) dog: ElementRef;
  @ViewChild('horse', { read: ElementRef, static:false }) horse: ElementRef;

  posts: Post[] = []
  postSub: Subscription
  destroySub: Subscription
  imageUrl: string
  filterPetByType = 'all'

  ngOnInit(): void {
    this.getAllPets()
  }

  getAllPets() {
    this.postSub = this.postService.getAll().subscribe(posts => {
      this.posts = this.getPostsByColor(posts);
      this.getImageUrl();
    })
  }

  getPostsByColor(posts) {
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

    return updatedPosts;
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
