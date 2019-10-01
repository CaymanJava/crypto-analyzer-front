import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { StrategyService } from "../../core/strategy/strategy.service";
import { MemberStrategyService } from "../../core/member-strategy/member-strategy.service";
import { MarketService } from "../../core/market/market.service";
import { Strategy } from "../../core/strategy/strategy.model";
import { Market } from "../../core/market/market.model";
import { MemberStrategy } from "../../core/member-strategy/member-strategy.model";

@Component({
  selector: 'app-member-strategy',
  templateUrl: './member-strategy.component.html'
})
export class MemberStrategyComponent implements OnInit, OnDestroy {

  memberStrategyIdSubscription: Subscription;
  memberStrategySubscription: Subscription;
  marketSubscription: Subscription;

  memberStrategyId: number;

  memberStrategy: MemberStrategy;
  strategy: Strategy;
  market: Market;

  constructor(private activatedRoute: ActivatedRoute,
              private strategyService: StrategyService,
              private memberStrategyService: MemberStrategyService,
              private marketService: MarketService) {
    this.memberStrategyIdSubscription = activatedRoute.params.subscribe(params => {
      this.memberStrategyId = +params['memberStrategyId'];
    });
  }

  ngOnInit() {
    this.subscribeToMemberStrategy();
  }

  ngOnDestroy() {
    if (this.memberStrategyIdSubscription != null) {
      this.memberStrategyIdSubscription.unsubscribe();
    }

    if (this.memberStrategySubscription != null) {
      this.memberStrategySubscription.unsubscribe();
    }

    if (this.marketSubscription != null) {
      this.marketSubscription.unsubscribe();
    }
  }

  canLoad() {
    return this.market != null && this.memberStrategy != null && this.strategy != null;
  }

  private subscribeToMemberStrategy() {
    this.memberStrategySubscription = this.memberStrategyService.getMemberStrategy(this.memberStrategyId)
      .subscribe(memberStrategy => {
        this.memberStrategy = memberStrategy;
        this.subscribeToMarket();
        this.extractStrategy()
      })
  }

  private subscribeToMarket() {
    this.marketSubscription = this.marketService.getMarket(this.memberStrategy.marketId)
      .subscribe(market => {
        this.market = market;
      })
  }

  private extractStrategy() {
    this.strategy = this.strategyService.getStrategy(this.memberStrategy.strategyType);
  }

}
