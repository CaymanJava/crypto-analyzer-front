import { Component, Input, OnInit } from '@angular/core';
import { Dashboard } from "../../core/dashboard/dashboard.model";

@Component({
  selector: 'app-last-added-market',
  templateUrl: './last-added-market.component.html',
  styleUrls: ['./last-added-market.component.css']
})
export class LastAddedMarketComponent implements OnInit {

  @Input() dashboard: Dashboard;

  constructor() { }

  ngOnInit() {
  }

}
