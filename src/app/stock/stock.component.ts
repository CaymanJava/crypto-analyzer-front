import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SharedAnimations } from "../shared/animations/shared-animations";
import { fromEvent, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { Stock } from "../core/stock/stock.model";
import { StockService } from "../core/stock/stock.service";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  animations: [SharedAnimations]
})
export class StockComponent implements OnInit, OnDestroy {
  page = 1;
  pageSize = 8;
  stocks: Stock[];
  allStocks: Stock[];
  stockSubscription: Subscription;
  searchSubscription: Subscription;

  @ViewChild('searchStock') search: ElementRef;

  constructor(private stockService: StockService) {
  }

  ngOnInit() {
    this.stockSubscription = this.stockService.getStocks()
      .subscribe((stocks: Stock[]) => {
        this.stocks = this.allStocks = stocks;
      });
    this.subscribeToSearching();
  }

  ngOnDestroy() {
    this.stockSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }

  subscribeToSearching() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keydown')
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {
        const request = this.search.nativeElement.value.trim().toLocaleLowerCase();
        this.stocks = this.allStocks.filter(stock => stock.name.toLocaleLowerCase().search(request) != -1);
      });
  }

}
