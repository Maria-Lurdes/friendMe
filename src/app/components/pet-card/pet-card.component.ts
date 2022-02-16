import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../shared/interfaces";
import {PostService} from "../../shared/services/post.service";
import {AlertService} from "../../shared/services/alert.service";
import {getStorage, ref, deleteObject} from "firebase/storage";

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.scss']
})
export class PetCardComponent implements OnInit {

  constructor(public postService: PostService, private alert: AlertService) { }

  @Input()
  petPost: Post;

  ngOnInit(): void {
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

}
