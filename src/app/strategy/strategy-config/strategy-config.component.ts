import { Component, OnDestroy, OnInit } from '@angular/core';
import { StrategySharedDataService } from "../../core/strategy/strategy-shared-data.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MarketService } from "../../core/market/market.service";
import { Market } from "../../core/market/market.model";
import { Strategy } from "../../core/strategy/strategy.model";

@Component({
  selector: 'app-strategy-config',
  templateUrl: './strategy-config.component.html'
})
export class StrategyConfigComponent implements OnInit, OnDestroy {

  strategy: Strategy;
  marketId: number;
  market: Market;

  marketSubscription: Subscription;

  constructor(private strategySharedDataService: StrategySharedDataService,
              private marketService: MarketService,
              private route: Router) {
    if (!strategySharedDataService.isDataCompleted()) {
      this.route.navigate([this.strategySharedDataService.resolveRoutePath()]);
    }
    this.strategy = this.strategySharedDataService.strategy;
    this.marketId = this.strategySharedDataService.marketId;
  }

  ngOnInit() {
    this.subscribeToMarket();
  }

  ngOnDestroy() {
    if (this.marketSubscription != null) {
      this.marketSubscription.unsubscribe();
    }
  }

  selectStrategy() {
    this.strategySharedDataService.clearStrategyType();
    this.route.navigate([this.strategySharedDataService.resolveRoutePath()]);
  }

  selectMarket() {
    this.strategySharedDataService.clearMarket();
    this.route.navigate([this.strategySharedDataService.resolveRoutePath()]);
  }

  private subscribeToMarket() {
    this.marketSubscription = this.marketService.getMarket(this.marketId)
      .subscribe(market => {
        this.market = market;
      })
  }

}
