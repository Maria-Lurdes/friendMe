import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetsDashboardRoutingModule } from './pets-dashboard-routing.module';
import { PetsListComponent } from './pets-list/pets-list.component';
import { PetInfoComponent } from './pet-info/pet-info.component';


@NgModule({
  declarations: [PetsListComponent, PetInfoComponent],
  imports: [
    CommonModule,
    PetsDashboardRoutingModule
  ]
})
export class PetsDashboardModule { }
