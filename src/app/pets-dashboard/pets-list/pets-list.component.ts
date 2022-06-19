import {Component, OnInit} from '@angular/core';
import {PostService} from "../../shared/services/post.service";
import {Post} from "../../shared/interfaces";
import {getDownloadURL, getStorage, listAll, ref} from "firebase/storage";
import {AlertService} from "../../shared/services/alert.service";
import {AuthService} from "../../shared/services/auth.service";
import {getAuth, onAuthStateChanged} from "firebase/auth";

@Component({
    selector: 'app-pets-list',
    templateUrl: './pets-list.component.html',
    styleUrls: ['./pets-list.component.scss']
})
export class PetsListComponent implements OnInit {

    constructor(private postService: PostService,private authService: AuthService, private alert: AlertService) {
    }

    posts: Post[] = []
    filterPetByType = 'all'
    userId: string = ''
    auth = getAuth();
    favouritesList: string[] = [];

    ngOnInit(): void {
        this.getChosenPets();
        this.getAllPets();
        this.getCurrentPosts();
        this.getUserId();
        this.getFavouritePetsList();
    }

    getFavouritePetsList() {
        this.authService.favouritesPetsList.subscribe(list => {
            this.favouritesList = list;
        })
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
        this.postService.petPostsArray.subscribe(currentPosts => {
            this.posts = this.getPostsByColor(currentPosts);
            if (currentPosts.length) this.getImageUrl();
        })
    }

    getAllPets() {
        this.postService.getAll();
    }

    scrollToPetList() {
        document.getElementById('pets-list').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    getPostsByColor(posts) {
        let updatedPosts = [];
        posts.forEach((item, index) => {
            let post = item;
            if (index === 0) {
                post = {...post, color: 'green'};
            } else {
                if (updatedPosts[updatedPosts.length - 1].color === 'green') {
                    post = {...post, color: 'orange'};
                } else if (updatedPosts[updatedPosts.length - 1].color === 'orange') {
                    post = {...post, color: 'blue'};
                } else if (updatedPosts[updatedPosts.length - 1].color === 'blue') {
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
            }).catch(() => {
            this.alert.danger('Smth went wrong, try again later');
        });
    }

}
