import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { LoginComponent } from "@app/admin/auth/login/login.component";
import { QuizEditComponent } from "@app/admin/quiz-edit/quiz-edit.component";
import { QuizMasterComponent } from "@app/admin/quiz-master/quiz-master.component";
import { SharedModule } from "@app/shared/shared.module";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    QuizEditComponent,
    QuizMasterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {
            path: 'login',
            component: LoginComponent
          },
          {
            path: 'master',
            component: QuizMasterComponent
          },
          {
            path: 'edit',
            component: QuizEditComponent
          },

          {
            path: '',
            redirectTo: '/admin/login',
            pathMatch: 'full'
          }
        ]
      }
    ])
  ],
  exports: [RouterModule],
})
export class AdminModule {

}
