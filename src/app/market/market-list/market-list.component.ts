import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-market',
  templateUrl: './market-list.component.html'
})
export class MarketListComponent implements OnInit {

  constructor(private route: Router) {
  }

  ngOnInit() {
  }

  onMarketSelect(marketId: any) {
    this.route.navigate(['/market', marketId]);
  }

}
