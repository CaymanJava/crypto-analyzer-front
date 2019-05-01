import { Component, OnDestroy, OnInit } from '@angular/core';
import { MarketService } from "../core/market/market.service";
import { Subject, Subscription } from "rxjs";
import { PageableParams, PageSlice } from "../core/api/api.model";
import { ActivatedRoute, Router } from "@angular/router";
import { StockService } from "../core/stock/stock.service";
import { Stock } from "../core/stock/stock.model";

@Component({
  selector: 'app-market',
  templateUrl: './market-list.component.html',
  styleUrls: ['./market-list.component.scss']
})
export class MarketListComponent implements OnInit, OnDestroy {

  changesSubscription: Subscription;
  marketSubscription: Subscription;
  stockSubscription: Subscription;
  currentStockSubscription: Subscription;
  changes: Subject<any> = new Subject();
  data: PageSlice;
  stocks: Stock[];
  pageableParams: PageableParams = this.getDefaultPageableParams();
  filterParams = {
    query: null,
    stock: null
  };

  constructor(private marketService: MarketService,
              private stockService: StockService,
              private activatedRoute: ActivatedRoute,
              private route: Router) {
    this.currentStockSubscription = activatedRoute.params.subscribe(params => {
      this.filterParams.stock = params['stockId'];
    });
  }

  ngOnInit() {
    this.subscribeToStock();
    this.subscribeToMarkets();
    this.changes.next();
  }

  ngOnDestroy() {
    this.changesSubscription.unsubscribe();
    this.marketSubscription.unsubscribe();
    this.stockSubscription.unsubscribe();
    this.currentStockSubscription.unsubscribe();
    this.changes.unsubscribe();
  }

  onPageChange(event: any) {
    this.pageableParams.page = event.page;
    this.changes.next();
  }

  onSortChange(event: any) {
    this.pageableParams.sort = event;
    this.changes.next();
  }

  onActionClick(event: any) {
    if (event.action === 'viewMarket') {
      this.route.navigate(['/market', event.row.id]);
    }
  }

  onFilter() {
    this.pageableParams = this.getDefaultPageableParams();
    this.changes.next();
  }

  subscribeToMarkets() {
    this.changesSubscription = this.changes.subscribe(() => {
      this.marketSubscription = this.marketService.getMarkets(this.pageableParams, this.filterParams).subscribe(pageSlice => {
        this.data = pageSlice;
      });
    });
  }

  getDefaultPageableParams() {
    return {
      page: 0,
      sort: {order: 'marketName', direction: 'desc'},
      size: 20
    };
  }

  private subscribeToStock() {
    this.stockSubscription = this.stockService.getStocks().subscribe(stocks => {
      this.stocks = stocks;
    });
  }

}
