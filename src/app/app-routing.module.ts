import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
import { UserAccountComponent } from "./user-account/user-account.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "signin", pathMatch: "full" },
  { path: "signin", component: SignInComponent },
  { path: "signup", component: SignUpComponent },
  { path: "forget-password", component: ForgetPasswordComponent },
  {
    path: "pets-dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  { path: "user-account", component: UserAccountComponent },
  { path: "**", pathMatch: "full", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
