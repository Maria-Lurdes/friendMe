import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PetsDashboardRoutingModule} from './pets-dashboard-routing.module';
import {PetsListComponent} from './pets-list/pets-list.component';
import {PetInfoComponent} from './pet-info/pet-info.component';
import {MatButtonModule} from "@angular/material/button";
import {AuthGuard} from "../shared/services/auth.guard";
import {PetCardComponent} from "../components/pet-card/pet-card.component";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {SharedModule} from "../shared/shared.module";
import { FavouritesPetsComponent } from './favourites-pets/favourites-pets.component';

@NgModule({
    declarations: [PetsListComponent, PetInfoComponent, PetCardComponent, FavouritesPetsComponent],
    imports: [
        CommonModule,
        PetsDashboardRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatProgressBarModule,
        SharedModule
    ],
    providers: [AuthGuard]
})
export class PetsDashboardModule {
}
