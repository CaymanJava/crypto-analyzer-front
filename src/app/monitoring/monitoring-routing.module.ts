import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MemberStrategyComponent } from "./member-strategy/member-strategy.component";
import { MemberStrategyListComponent } from "./member-strategy-list/member-strategy-list.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'strategy',
    pathMatch: 'full'
  },
  {
    path: 'strategy',
    component: MemberStrategyListComponent,
  },
  {
    path: 'strategy/:memberStrategyId',
    component: MemberStrategyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule {

}
