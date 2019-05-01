import { Component, Input, OnInit } from '@angular/core';
import { Dashboard } from "../../core/dashboard/dashboard.model";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html'
})
export class StatisticComponent implements OnInit {

  @Input() dashboard: Dashboard;
  constructor() { }

  ngOnInit() {
  }

}
