import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PetsListComponent} from "./pets-list/pets-list.component";
import {PetInfoComponent} from "./pet-info/pet-info.component";

const routes: Routes = [
  { path:'pets-list', component: PetsListComponent },
  { path:'pet-info', component: PetInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsDashboardRoutingModule { }
