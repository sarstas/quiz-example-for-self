import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor } from "@app/admin/auth/jwt.interceptor";
import { ErrorInterceptor } from "@app/shared/error.interceptor";

@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
  ],
  exports: [
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class SharedModule {
}
