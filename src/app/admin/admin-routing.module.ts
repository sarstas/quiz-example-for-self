import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminLayoutComponent } from "@app/admin/components/admin-layout/admin-layout.component";
import { QuizMasterComponent } from "@app/admin/quiz-master/quiz-master.component";
import { QuizEditComponent } from "@app/admin/quiz-edit/quiz-edit.component";


const routes: Routes = [
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "/admin/master",
        pathMatch: "full"
      },
      {
        path: "master",
        component: QuizMasterComponent
      },
      {
        path: "edit/:id",
        component: QuizEditComponent
      },
      {
        path: "create",
        component: QuizEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
