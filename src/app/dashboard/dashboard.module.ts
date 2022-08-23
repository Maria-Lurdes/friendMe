import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { PetsListComponent } from "./pets-list/pets-list.component";
import { PetInfoComponent } from "./pet-info/pet-info.component";
import { AuthGuard } from "../shared/services/auth.guard";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { SharedModule } from "../shared/shared.module";
import { FavouritesPetsComponent } from "./favourites-pets/favourites-pets.component";
import { DashboardComponent } from "./dashboard.component";
import { PetWallpaperComponent } from "./pet-wallpaper/pet-wallpaper.component";
import { PetCardComponent } from "./pet-card/pet-card.component";
import { MatPaginatorModule } from "@angular/material/paginator";

const modules = [MatPaginatorModule, MatProgressBarModule];

@NgModule({
  declarations: [
    PetsListComponent,
    PetInfoComponent,
    PetCardComponent,
    FavouritesPetsComponent,
    DashboardComponent,
    PetWallpaperComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, ...modules],
  exports: [...modules],
  providers: [AuthGuard],
})
export class DashboardModule {}
