import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./core/auth/auth.guard";
import { ContentLayoutComponent } from "./layout/content-layout/content-layout.component";
import { SessionLayoutComponent } from "./layout/session-layout/session-layout.component";

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'stock',
        canActivate: [AuthGuard],
        loadChildren: () => import('./stock/stock.module').then(m => m.StockModule),
      },
      {
        path: 'market',
        canActivate: [AuthGuard],
        loadChildren: () => import('./market/market.module').then(m => m.MarketModule),
      },
      {
        path: 'strategy',
        canActivate: [AuthGuard],
        loadChildren: () => import('./strategy/strategy.module').then(m => m.StrategyModule),
      },
      {
        path: 'monitoring',
        canActivate: [AuthGuard],
        loadChildren: () => import('./monitoring/monitoring.module').then(m => m.MonitoringModule),
      }
    ]
  },
  {
    path: 'session',
    component: SessionLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./session/session.module').then(m => m.SessionModule),
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
