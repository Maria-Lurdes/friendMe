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

@NgModule({
    declarations: [PetsListComponent, PetInfoComponent, PetCardComponent],
    imports: [
        CommonModule,
        PetsDashboardRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatProgressBarModule
    ],
    providers: [AuthGuard]
})
export class PetsDashboardModule {
}
