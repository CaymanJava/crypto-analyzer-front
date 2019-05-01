import { Component, Input, OnInit } from '@angular/core';
import { Dashboard } from "../../core/dashboard/dashboard.model";

@Component({
  selector: 'app-volume-market',
  templateUrl: './top-volume-market.component.html'
})
export class TopVolumeMarketComponent implements OnInit {

  @Input() dashboard: Dashboard;

  constructor() { }

  ngOnInit() {
  }

}
