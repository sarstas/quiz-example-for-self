import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "@app/home/home.component";
import { QuizComponent } from "@app/home/components/quiz/quiz.component";
import { AuthGuard } from "@app/admin/auth/auth.guard";
import { LoginComponent } from "@app/admin/auth/login/login.component";
import { NonAuthGuard } from "@app/admin/auth/non-auth.guard";

const routes: Routes = [
  {
    path: "", component: HomeComponent, children: [
      { path: "quiz", component: QuizComponent },
      { path: "", redirectTo: "/quiz", pathMatch: "full" }
    ]
  },
  {
    path: "admin",
    loadChildren: () => import("./admin/admin.module").then(mod => mod.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard]
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
