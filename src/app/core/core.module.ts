import { NgModule } from "@angular/core";
import { NavigationModule } from "./navigation/navigation.module";
import { SearchModule } from "./search/search.module";

@NgModule({
  imports: [
    NavigationModule,
    SearchModule
  ],
  exports: [
    NavigationModule,
    SearchModule
  ]
})
export class CoreModule {

}
