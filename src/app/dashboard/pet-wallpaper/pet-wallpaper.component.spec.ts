import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PetWallpaperComponent } from "./pet-wallpaper.component";

describe("PetWallpaperComponent", () => {
  let component: PetWallpaperComponent;
  let fixture: ComponentFixture<PetWallpaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PetWallpaperComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetWallpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
