import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PetsListComponent} from "./pets-list/pets-list.component";
import {PetInfoComponent} from "./pet-info/pet-info.component";
import {AuthGuard} from "../shared/services/auth.guard";
import {FavouritesPetsComponent} from "./favourites-pets/favourites-pets.component";

const routes: Routes = [
    {path: '', component: PetsListComponent, canActivate: [AuthGuard]},
    {path: 'favourites', component: FavouritesPetsComponent, canActivate: [AuthGuard]},
    {path: 'pet-info/:id', component: PetInfoComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PetsDashboardRoutingModule {
}
