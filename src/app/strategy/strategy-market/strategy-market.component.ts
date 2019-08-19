import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { StrategySharedDataService } from "../../core/strategy/strategy-shared-data.service";

@Component({
  selector: 'app-strategy-market',
  templateUrl: './strategy-market.component.html',
  styleUrls: ['./strategy-market.component.scss']
})
export class StrategyMarketComponent implements OnInit {

  constructor(private strategySharedDataService: StrategySharedDataService,
              private route: Router) {
  }

  ngOnInit() {

  }

  onMarketSelect(marketId: number) {
    this.strategySharedDataService.marketId = marketId;
    this.route.navigate([this.strategySharedDataService.resolveRoutePath()]);
  }

  backToStrategies() {
    this.strategySharedDataService.clear();
    this.route.navigate(['/strategy', 'list']);
  }

}
