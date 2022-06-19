import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../shared/interfaces";
import {PostService} from "../../shared/services/post.service";
import {AlertService} from "../../shared/services/alert.service";
import {getStorage, ref, deleteObject} from "firebase/storage";
import {CreateEditPostModalComponent} from "../create-edit-post-modal/create-edit-post-modal.component";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../shared/services/auth.service";

@Component({
    selector: 'app-pet-card',
    templateUrl: './pet-card.component.html',
    styleUrls: ['./pet-card.component.scss']
})
export class PetCardComponent implements OnInit {

    constructor(public dialog: MatDialog, public postService: PostService, public authService: AuthService, private alert: AlertService) {
    }

    @Input()
    petPost: Post;

    @Input()
    userId: string;

    @Input()
    favouritesList: string[] = [];

    isAdmin: boolean = false;
    isFavourite: boolean = false;

    ngOnInit(): void {
        this.isAdmin = localStorage.getItem('role') === 'admin';
        this.getChosenPosts();
    }

    getChosenPosts() {
        this.isFavourite = !!(this.favouritesList.length && this.favouritesList.find(id => id === this.petPost.id));
    }

    removePost() {
        this.postService.remove(this.petPost.id).subscribe(() => {
            let fireStorage = getStorage();
            const imageRef = ref(fireStorage, `pets-avatars/${this.petPost.id}`);
            deleteObject(imageRef).then(() => {
                this.alert.success('Post was successfully deleted');
                this.postService.getAll();
            }).catch(() => {
                this.alert.danger('Smth went wrong, try again later');
            });
        })
    }

    openEditFormModal() {
        let config = new MatDialogConfig();
        let dialogRef: MatDialogRef<CreateEditPostModalComponent> = this.dialog.open(CreateEditPostModalComponent, config);
        dialogRef.componentInstance.postToEdit = this.petPost;
    }

    addRemoveToFavoirites() {
        if(this.isFavourite) {
            this.isFavourite = false;
            let updatedArray =  this.favouritesList.filter(id => id !== this.petPost.id);
            this.updateLocalStorage(updatedArray);
        } else {
            this.isFavourite = true;
            let updatedArray = [...this.favouritesList];
            updatedArray.push(this.petPost.id);
            this.updateLocalStorage(updatedArray);
        }
    }

    updateLocalStorage(list) {
        localStorage.removeItem(this.userId);
        localStorage.setItem(this.userId, JSON.stringify(list));
        this.authService.getFavourites();
    }

}
