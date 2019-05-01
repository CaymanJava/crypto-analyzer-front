import { NgModule } from "@angular/core";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedPipesModule } from "../../shared/pipes/shared-pipes.module";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedDirectivesModule } from "../../shared/directives/shared-directives.module";
import { ChildSidebarComponent } from './sidebar/child/child-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedPipesModule,
    SharedDirectivesModule,
    PerfectScrollbarModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ChildSidebarComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent
  ]
})
export class NavigationModule {

}
