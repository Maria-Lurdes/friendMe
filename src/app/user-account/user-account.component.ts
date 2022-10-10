import { Component, OnInit } from "@angular/core";
import { CatQuote, UserAuthInfo } from "../shared/interfaces";
import { PostService } from "../shared/services/post.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EditInfoModalComponent } from "./edit-info-modal/edit-info-modal.component";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthService } from "../shared/services/auth.service";
import { EditPassModalComponent } from "./edit-pass-modal/edit-pass-modal.component";

@Component({
  selector: "app-user-account",
  templateUrl: "./user-account.component.html",
  styleUrls: ["./user-account.component.scss"],
})
export class UserAccountComponent implements OnInit {
  user: UserAuthInfo;
  randomCatQuote: string;
  firebasAuth = getAuth();

  constructor(
    public auth: AuthService,
    public postService: PostService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getRandomFact();
    onAuthStateChanged(this.firebasAuth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  getRandomFact(): void {
    this.postService.getRandomFact().subscribe((quotesList: CatQuote) => {
      this.randomCatQuote = quotesList.data[0];
    });
  }

  editInfo(): void {
    let config = new MatDialogConfig();
    this.dialog.open(EditInfoModalComponent, config);
  }

  changePassword(): void {
    let config = new MatDialogConfig();
    this.dialog.open(EditPassModalComponent, config);
  }
}
