import {Component, OnInit} from '@angular/core';
import {AlertService} from "../../shared/services/alert.service";
import {PostService} from "../../shared/services/post.service";
import {ActivatedRoute, Params} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {getDownloadURL, getStorage, ref} from "firebase/storage";

@Component({
    selector: 'app-pet-info',
    templateUrl: './pet-info.component.html',
    styleUrls: ['./pet-info.component.scss']
})
export class PetInfoComponent implements OnInit {

    post: Post
    uSub: Subscription

    constructor(private route: ActivatedRoute,
                private alert: AlertService,
                private postsService: PostService,) {
    }

    ngOnInit() {
        this.route.params.pipe(
            switchMap((params: Params) => {
                return this.postsService.getById(params['id'])
            })
        ).subscribe((post: Post) => {
            this.post = post;
            this.getImageUrl();
        })
    }

    getImageUrl() {
        let fireStorage = getStorage();
        console.log(this.post, 'this.post')
        const pathRef = ref(fireStorage, `pets-avatars/${this.post.id}`);
        getDownloadURL(pathRef).then(url => {
            this.post.avatar = url;
        })
    }

    ngOnDestroy() {
        if (this.uSub) {
            this.uSub.unsubscribe()
        }
    }

}
