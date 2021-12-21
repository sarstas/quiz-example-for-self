import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "./components/admin-layout/admin-layout.component";
import { QuizEditComponent } from "@app/admin/quiz-edit/quiz-edit.component";
import { QuizMasterComponent } from "@app/admin/quiz-master/quiz-master.component";
import { SharedModule } from "@app/shared/shared.module";
import { AdminRoutingModule } from "@app/admin/admin-routing.module";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    QuizEditComponent,
    QuizMasterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  exports: [RouterModule]
})
export class AdminModule {

}
