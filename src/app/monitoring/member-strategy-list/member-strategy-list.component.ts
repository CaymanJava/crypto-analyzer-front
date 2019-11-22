import { Component, OnDestroy, OnInit } from '@angular/core';
import { MemberStrategyService } from "../../core/member-strategy/member-strategy.service";
import { Subject, Subscription } from "rxjs";
import { PageableParams, PageSlice } from "../../core/api/api.model";
import { Stock } from "../../core/stock/stock.model";
import { StockService } from "../../core/stock/stock.service";
import { Router } from "@angular/router";
import { Color } from "../../shared/components/grid/grid.model";
import { Strategy } from "../../core/strategy/strategy.model";
import { StrategyService } from "../../core/strategy/strategy.service";

@Component({
  selector: 'app-member-strategy-list',
  templateUrl: './member-strategy-list.component.html',
  styleUrls: ['./member-strategy-list.component.scss']
})
export class MemberStrategyListComponent implements OnInit, OnDestroy {

  stockSubscription: Subscription;
  strategySubscription: Subscription;
  memberStrategiesSubscription: Subscription;
  changesSubscription: Subscription;
  changes: Subject<any> = new Subject();

  data: PageSlice;
  stocks: Stock[];
  strategies: Strategy[];
  pageableParams: PageableParams = this.getDefaultPageableParams();
  filterParams = this.getDefaultFilterParams();

  constructor(private memberStrategyService: MemberStrategyService,
              private stockService: StockService,
              private strategyService: StrategyService,
              private route: Router) {
  }

  ngOnInit() {
    this.subscribeToStock();
    this.subscribeToStrategies();
    this.subscribeToMemberStrategies();
    this.changes.next();
  }

  ngOnDestroy() {
    this.changesSubscription.unsubscribe();
    this.memberStrategiesSubscription.unsubscribe();
    this.stockSubscription.unsubscribe();
    this.strategySubscription.unsubscribe();
    this.changes.unsubscribe();
  }

  getDefaultPageableParams() {
    return {
      page: 0,
      sort: {order: 'strategyName', direction: 'desc'},
      size: 20
    };
  }

  getDefaultFilterParams() {
    return {
      query: '',
      stock: '',
      status: '',
      type: '',
      timeFrame: ''
    };
  }

  defineColor(raw) {
    switch (raw.status) {
      case 'ACTIVE':
        return Color.GREEN;
      case 'PAUSED':
        return Color.BLUE;
      default:
        return Color.RED;
    }
  }

  getDestination(raw) {
    switch (raw.notificationDestination) {
      case 'SMS':
        return 'SMS';
      case 'EMAIL':
        return 'Email';
      default:
        return 'All';
    }
  }

  getStatus(raw) {
    switch (raw.status) {
      case 'ACTIVE':
        return 'Active';
      case 'PAUSED':
        return 'Paused';
      case 'STOPPED':
        return 'Stopped';
      default:
        return 'Failed';
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

  onFilter() {
    this.pageableParams = this.getDefaultPageableParams();
    this.changes.next();
  }

  onClear() {
    this.filterParams.query = '';
    this.filterParams.stock = '';
    this.filterParams.status = '';
    this.filterParams.type = '';
    this.filterParams.timeFrame = '';
    this.changes.next();
  }

  timeFrameChange(event) {
    this.filterParams.timeFrame = event;
    this.changes.next();
  }

  onActionClick(event: any) {
    if (event.action === 'selectStrategy') {
      this.route.navigate(['/monitoring/strategy', event.row.id]);
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

  private subscribeToMemberStrategies() {
    this.changesSubscription = this.changes.subscribe(() => {
      this.memberStrategiesSubscription = this.memberStrategyService.getStrategies(this.pageableParams, this.filterParams).subscribe(pageSlice => {
        this.data = pageSlice;
      });
    });
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

}
