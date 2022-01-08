import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PetsDashboardRoutingModule} from './pets-dashboard-routing.module';
import {PetsListComponent} from './pets-list/pets-list.component';
import {PetInfoComponent} from './pet-info/pet-info.component';
import {MatButtonModule} from "@angular/material/button";
import {AuthGuard} from "../shared/services/auth.guard";

@NgModule({
    declarations: [PetsListComponent, PetInfoComponent],
    imports: [
        CommonModule,
        PetsDashboardRoutingModule,
        MatButtonModule
    ],
    providers: [AuthGuard]
})
export class PetsDashboardModule {
}
