import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PetInfoComponent} from "./pet-info/pet-info.component";
import {AuthGuard} from "../shared/services/auth.guard";
import {FavouritesPetsComponent} from "./favourites-pets/favourites-pets.component";
import {DashboardComponent} from "./dashboard.component";

const routes: Routes = [
    {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'favourites', component: FavouritesPetsComponent, canActivate: [AuthGuard]},
    {path: 'pet-info/:id', component: PetInfoComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
