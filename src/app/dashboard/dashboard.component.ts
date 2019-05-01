import { Component, OnInit } from '@angular/core';
import { Dashboard } from "../core/dashboard/dashboard.model";
import { DashboardService } from "../core/dashboard/dashboard.service";

@Component({
  selector: 'app-dashboard-default',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  dashboard: Dashboard;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.dashboardService.getDashboardStatistic().subscribe(
      dashboard => {
        this.dashboard = dashboard;
      }
    );
  }

}
