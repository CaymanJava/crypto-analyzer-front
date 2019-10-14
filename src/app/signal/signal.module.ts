import { NgModule } from "@angular/core";
import { SignalRoutingModule } from "./signal-routing.module";
import { CommonModule } from "@angular/common";
import { SharedComponentsModule } from "../shared/components/shared-components.module";
import { NgxPaginationModule } from "ngx-pagination";
import { NgbModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedPipesModule } from "../shared/pipes/shared-pipes.module";
import { SharedDirectivesModule } from "../shared/directives/shared-directives.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignalListComponent } from './signal-list/signal-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SignalRoutingModule,
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule,
    NgxPaginationModule,
    NgbModule,
    NgbTooltipModule,
  ],
  declarations: [SignalListComponent],
  providers: []
})
export class SignalModule {

}
