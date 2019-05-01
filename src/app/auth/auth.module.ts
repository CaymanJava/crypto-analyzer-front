import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations: [
    AuthComponent
  ],
  providers: [
    CommonModule,

  ],
  imports: [
    AuthRoutingModule
  ]
})
export class AuthModule {

}
