import {Component, OnInit, Sanitizer} from '@angular/core';
import {User} from "../shared/interfaces";
import {PostService} from "../shared/services/post.service";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  user: User;
  imageUrl;

  constructor(public postService: PostService, public sanitizer: Sanitizer) { }

  ngOnInit(): void {
    this.getRandomFact();
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.user, 'user')
  }

  changeEmail() {}

  changePassword() {}

  getRandomFact() {
    this.postService.getRandomFact().subscribe((data) => {
      console.log(data, 'data');
    })

  }
}
