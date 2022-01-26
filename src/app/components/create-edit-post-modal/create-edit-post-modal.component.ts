import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {PostService} from "../../shared/services/posts.service";
import {AlertService} from "../../shared/services/alert.service";

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
    filename = [''];
    uploadData = new FormData();

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
        })
    }

    closeModal() {
        this.dialogRef.close();
    }

    submit() {
        const post: Post = {
            name: this.petPost.value.name,
            description: this.petPost.value.description,
            age: this.petPost.value.age,
            sex: this.petPost.value.sex,
            weight: this.petPost.value.weight,
        }

        this.postService.createPost(post).subscribe(() => {
            this.petPost.reset()
            this.alert.success('Post was created')
        })

    };

    setFileName(e): void {
        if (e.target.files[0]?.size > 500000) {
            // TODO: error message
            // this.toaster.error('Your file is bigger than 500ko. Please, choose another one.');
        } else {
            this.filename = [];
            this.filename = e.target.files;
            this.uploadData = new FormData();
            this.uploadData.set('file', this.filename[0]);

            // const reader = new FileReader();
            // reader.onload = () => {
            //   this.widgetSettings.eventEmailSettings.imageUrl = reader.result as string;
            // };
            // reader.readAsDataURL(e.target.files[0]);
        }
    }

}
