import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignalListComponent } from "./signal-list/signal-list.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: SignalListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignalRoutingModule {

}
