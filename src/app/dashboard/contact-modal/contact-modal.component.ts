import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { PostService } from "../../shared/services/post.service";
import { AlertService } from "../../shared/services/alert.service";
import { ContactForm } from "../../shared/interfaces";

@Component({
  selector: "app-contact-modal",
  templateUrl: "./contact-modal.component.html",
  styleUrls: ["./contact-modal.component.scss"],
})
export class ContactModalComponent implements OnInit {
  type: string;
  petId: string;
  contactsForm: FormGroup;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<ContactModalComponent>,
    public postService: PostService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.contactsForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  submit() {
    let contactForm: ContactForm = {
      id: this.petId,
      name: this.contactsForm.value.name,
      phone: this.contactsForm.value.phone,
      type: this.type,
    };

    this.postService.saveContactForm(contactForm).subscribe(() => {
      this.alert.success("Your contacts was saved. We will contact you soon.");
      this.closeModal();
    });
  }
}
