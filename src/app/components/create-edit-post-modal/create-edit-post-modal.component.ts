import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

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
  constructor(public dialogRef: MatDialogRef<CreateEditPostModalComponent>) { }

  ngOnInit(): void {
    this.petPost = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      avatar: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      sex: new FormControl(null, [Validators.required]),
      weight: new FormControl(null, [Validators.required]),
    })
  }

  closeModal() {
    this.dialogRef.close();
  }

  submit() {

  };

}
