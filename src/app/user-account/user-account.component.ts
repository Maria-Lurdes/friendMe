import {Component, OnInit, Sanitizer} from '@angular/core';
import {User} from "../shared/interfaces";
import {PostService} from "../shared/services/post.service";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {ContactModalComponent} from "../components/contact-modal/contact-modal.component";
import {EditInfoModalComponent} from "./edit-info-modal/edit-info-modal.component";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  user: User;
  imageUrl;

  constructor(public postService: PostService, public sanitizer: Sanitizer, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getRandomFact();
    this.user = JSON.parse(localStorage.getItem('userInfo'));
  }

  editInfo() {
    let config = new MatDialogConfig();
    let dialogRef:MatDialogRef<EditInfoModalComponent> = this.dialog.open(EditInfoModalComponent, config);
  }

  // openContactFormModal(type) {
  //   let config = new MatDialogConfig();
  //   let dialogRef:MatDialogRef<ContactModalComponent> = this.dialog.open(ContactModalComponent, config);
  //   dialogRef.componentInstance.petId = this.post.id;
  //   dialogRef.componentInstance.type = type;
  // }

  changePassword() {}

  getRandomFact() {
    this.postService.getRandomFact().subscribe((data) => {
      console.log(data, 'data');
    })

  }
}
