import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "@app/home/home.component";
import { QuizComponent } from "@app/home/components/quiz/quiz.component";

const routes: Routes = [
  {
    path: "", component: HomeComponent, children: [
      { path: "quiz", component: QuizComponent },
      { path: "", redirectTo: "/quiz", pathMatch: "full" }
    ]
  },
  // { path: "login", component: LoginComponent, canActivate: [NonAuthGuard] },
  {
    path: "admin",
    loadChildren: () => import("./admin/admin.module").then(mod => mod.AdminModule)
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
