import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from "rxjs";
import { Stock } from "../../core/stock/stock.model";
import { Strategy } from "../../core/strategy/strategy.model";
import { StockService } from "../../core/stock/stock.service";
import { StrategyService } from "../../core/strategy/strategy.service";
import { MonitoringService } from "../../core/monitoring/monitoring.service";
import { PageableParams, PageSlice } from "../../core/api/api.model";
import { Router } from "@angular/router";
import { Color } from "../../shared/components/grid/grid.model";

@Component({
  selector: 'app-signal-list',
  templateUrl: './signal-list.component.html',
  styleUrls: ['./signal-list.component.scss']
})
export class SignalListComponent implements OnInit {

  stockSubscription: Subscription;
  strategySubscription: Subscription;
  signalSubscription: Subscription;
  changesSubscription: Subscription;
  changes: Subject<any> = new Subject();

  data: PageSlice;
  pageableParams: PageableParams = this.getDefaultPageableParams();
  filterParams = this.getDefaultFilterParams();

  stocks: Stock[];
  strategies: Strategy[];

  constructor(private stockService: StockService,
              private strategyService: StrategyService,
              private monitoringService: MonitoringService,
              private route: Router) { }

  ngOnInit() {
    this.subscribeToStock();
    this.subscribeToStrategies();
    this.subscribeToSignals();
    this.changes.next();
  }

  getDefaultPageableParams() {
    return {
      page: 0,
      sort: {order: 'creationTime', direction: 'desc'},
      size: 20
    };
  }

  getDefaultFilterParams() {
    return {
      query: '',
      stock: '',
      type: '',
      timeFrame: ''
    };
  }

  onActionClick(event: any) {
    if (event.action === 'selectStrategy') {
      this.route.navigate(['/monitoring/strategy', event.row.memberStrategyId]);
    }
  }

  onPageChange(event: any) {
    this.pageableParams.page = event.page;
    this.changes.next();
  }

  onSortChange(event: any) {
    this.pageableParams.sort = event;
    this.changes.next();
  }

  definePositionColor(raw) {
    if (raw.positions.length == 1) {
      switch (raw.positions[0]) {
        case 'ENTRY_LONG':
          return Color.GREEN;
        case 'EXIT_LONG':
          return Color.RED;
        case 'ENTRY_SHORT':
          return Color.ORANGE;
        default:
          return Color.BLUE;
      }
    }
    return null;
  }

  onFilter() {
    this.pageableParams = this.getDefaultPageableParams();
    this.changes.next();
  }

  onClear() {
    this.filterParams.query = '';
    this.filterParams.stock = '';
    this.filterParams.type = '';
    this.filterParams.timeFrame = '';
    this.changes.next();
  }

  getPosition(raw) {
    return raw.positions.map(position => getSinglePosition(position)).join(", ");

    function getSinglePosition(position) {
      switch (position) {
        case 'ENTRY_LONG':
          return 'Entry Long';
        case 'EXIT_LONG':
          return 'Exit Long';
        case 'ENTRY_SHORT':
          return 'Entry Short';
        case 'EXIT_SHORT':
          return 'Exit Short';
        default:
          return '';
      }
    }
  }

  getTimeFrame(raw) {
    switch (raw.timeFrame) {
      case 'FIVE_MIN':
        return '5 Min';
      case 'FIFTEEN_MIN':
        return '15 Min';
      case 'THIRTY_MIN':
        return '30 Min';
      case 'ONE_HOUR':
        return '1 Hour';
      case 'FOUR_HOURS':
        return '4 Hours';
      default:
        return '1 Day';
    }
  }

  private subscribeToStock() {
    this.stockSubscription = this.stockService.getStocks().subscribe(stocks => {
      this.stocks = stocks;
    });
  }

  private subscribeToStrategies() {
    this.strategySubscription = this.strategyService.getStrategies().subscribe(strategies => {
      this.strategies = strategies;
    });
  }

  private subscribeToSignals() {
    this.changesSubscription = this.changes.subscribe(() => {
      this.signalSubscription = this.monitoringService.getSignals(this.pageableParams, this.filterParams).subscribe(pageSlice => {
        this.data = pageSlice;
      });
    });
  }

}
