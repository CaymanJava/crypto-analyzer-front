import { Component, Input, OnInit } from '@angular/core';
import { Market } from "../../../core/market/market.model";

@Component({
  selector: 'app-stock-market-header',
  templateUrl: './stock-market-header.component.html'
})
export class StockMarketHeader implements OnInit {

  @Input() market: Market;

  constructor() {
  }

  ngOnInit() {
  }

}
