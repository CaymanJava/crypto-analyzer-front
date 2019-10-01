import { Component, Input, OnInit } from '@angular/core';
import { Market } from "../../core/market/market.model";
import { Strategy } from "../../core/strategy/strategy.model";
import { MemberStrategy } from "../../core/member-strategy/member-strategy.model";

@Component({
  selector: 'app-strategy-view',
  templateUrl: './strategy-view.component.html'
})
export class StrategyViewComponent implements OnInit {

  @Input() market: Market;
  @Input() strategy: Strategy;
  @Input() memberStrategy: MemberStrategy;

  constructor() {
  }

  ngOnInit() {
  }

}
