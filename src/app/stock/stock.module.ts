import { NgModule } from "@angular/core";
import { StockComponent } from "./stock.component";
import { CommonModule } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule } from "@angular/forms";
import { StockRoutingModule } from "./stock-routing-module";
import { SharedComponentsModule } from "../shared/components/shared-components.module";
import { CoreModule } from "../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    StockRoutingModule,
    NgxPaginationModule,
    SharedComponentsModule,
    FormsModule,
    CoreModule
  ],
  declarations: [
    StockComponent
  ],
  providers: [
    StockComponent
  ]
})
export class StockModule {

}
