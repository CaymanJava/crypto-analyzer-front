import { Injectable } from "@angular/core";
import { Strategy } from "./strategy.model";

@Injectable({
  providedIn: "root"
})
export class StrategySharedDataService {

  private _strategy: Strategy;

  get strategy(): Strategy {
    return this._strategy;
  }

  set strategy(value: Strategy) {
    this._strategy = value;
  }

  private _marketId: number;

  get marketId(): number {
    return this._marketId;
  }

  set marketId(value: number) {
    this._marketId = value;
  }

  clear() {
    this.strategy = null;
    this.marketId = null;
  }

  clearStrategyType() {
    this.strategy = null;
  }

  clearMarket() {
    this.marketId = null;
  }

  isDataCompleted() {
    return this.strategy != null && this.marketId != null;
  }

  resolveRoutePath() {
    if (this.strategy == null) {
      return '/strategy';
    }

    if (this.marketId == null) {
      return '/strategy/market'
    }

    return '/strategy/config'
  }

}
