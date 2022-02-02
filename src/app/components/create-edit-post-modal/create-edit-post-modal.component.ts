import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {PostService} from "../../shared/services/posts.service";
import {AlertService} from "../../shared/services/alert.service";
import {FileService} from "../../shared/services/file.service";

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

    constructor(public dialogRef: MatDialogRef<CreateEditPostModalComponent>,
                public postService: PostService,
                private alert: AlertService,
                private fileService: FileService) {
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
            this.fileService.pushFileToStorage(data.id, file);
            this.petPost.reset();
            this.closeModal();
            this.alert.success('Post was created');
        })
    };

    setFile(e): void {
            if (e.target.files[0].size > 5000000) {
                this.alert.warning('Your file is bigger than 500ko. Please, choose another one.');
                // TODO: test error message
            } else {
                this.petAvatar = e.target.files;
            }
    }

}
