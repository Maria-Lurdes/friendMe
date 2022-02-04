import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../shared/interfaces";

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.scss']
})
export class PetCardComponent implements OnInit {

  constructor() { }

  @Input()
  petPost: Post;

  ngOnInit(): void {
  }

}
