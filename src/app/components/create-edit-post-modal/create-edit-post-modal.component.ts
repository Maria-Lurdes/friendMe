import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {PostService} from "../../shared/services/post.service";
import {AlertService} from "../../shared/services/alert.service";
import {getStorage, ref, uploadBytes} from "firebase/storage";

@Component({
    selector: 'app-create-edit-post-modal',
    templateUrl: './create-edit-post-modal.component.html',
    styleUrls: ['./create-edit-post-modal.component.scss']
})
export class CreateEditPostModalComponent implements OnInit {

    @Input()
    customPost: Post;
    petPost: FormGroup;
    submitted = false;
    petAvatar: FileList;
    avatarName: string;
    fireStorage = getStorage();

    constructor(public dialogRef: MatDialogRef<CreateEditPostModalComponent>,
                public postService: PostService,
                private alert: AlertService) {
    }

    ngOnInit(): void {
        this.petPost = new FormGroup({
            name: new FormControl(null, [Validators.required]),
            description: new FormControl(null, [Validators.required]),
            age: new FormControl(null, [Validators.required]),
            sex: new FormControl(null, [Validators.required]),
            weight: new FormControl(null, [Validators.required]),
            type: new FormControl(null, [Validators.required]),
        })
    }

    closeModal() {
        this.dialogRef.close();
    }

    submit() {
        this.submitted = true;
        const post: Post = {
            name: this.petPost.value.name,
            description: this.petPost.value.description,
            age: this.petPost.value.age,
            sex: this.petPost.value.sex,
            weight: this.petPost.value.weight,
            type: this.petPost.value.type
        }

        this.postService.createPost(post).subscribe((data: Post) => {
            const file = this.petAvatar.item(0);
            let url = ref(this.fireStorage, `pets-avatars/${data.id}`);
            const metadata = {
                contentType: 'image/jpeg',
            };

            uploadBytes(url, file, metadata).then(() => {
                this.submitted = false;
                this.petPost.reset();
                this.closeModal();
                this.alert.success('Post was created');
            })
        })
    };

    setFile(e): void {
        if (e.target.files[0].size > 50000000) {
            this.alert.warning('Your file is bigger than 500ko. Please, choose another one.');
            // TODO: test error message
        } else {
            this.petAvatar = e.target.files;
            this.avatarName = e.target.files[0].name;
        }
    }

}
