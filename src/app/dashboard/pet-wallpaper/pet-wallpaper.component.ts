import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pet-wallpaper",
  templateUrl: "./pet-wallpaper.component.html",
  styleUrls: ["./pet-wallpaper.component.scss"],
})
export class PetWallpaperComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  scrollToPetList(): void {
    document
      .getElementById("pets-list")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
