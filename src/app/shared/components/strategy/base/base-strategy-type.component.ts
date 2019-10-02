import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import * as moment from 'moment';
import { Market } from "../../../../core/market/market.model";
import { Signal } from "../../../../core/signal/signal.model";
import { Strategy, StrategyCalculationRequest } from "../../../../core/strategy/strategy.model";
import { StrategyCalculationService } from "../../../../core/strategy/strategy-calculation.service";
import { ChartDrawService } from "../../../../core/chart/chart-draw.service";
import { IndicatorDrawService } from "../../../../core/indicator/indicator-draw.service";
import { SignalDrawService } from "../../../../core/signal/signal-draw.service";
import { SignalBuilderService } from "../../../../core/signal/signal-builder.service";
import { ChartSaveService } from "../../../../core/chart/chart.save.service";
import { DatePipe } from "@angular/common";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TickData, TimeFrame } from "../../../../core/tick/tick.model";
import { MemberStrategyConfigComponent } from "../member-strategy-config/member-strategy-config.component";
import { MemberStrategy, MemberStrategyCreateRequest, MemberStrategyRequest, MemberStrategyUpdateRequest } from "../../../../core/member-strategy/member-strategy.model";
import { MemberStrategyService } from "../../../../core/member-strategy/member-strategy.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../../services/notification.service";

@Component({
  moduleId: module.id,
  template: ''
})
export abstract class BaseStrategyTypeComponent implements OnInit, OnDestroy {

  @Input() market: Market;
  @Input() strategy: Strategy;
  @Input() memberStrategy: MemberStrategy;

  signals: Signal[];

  dialogConfig: any = {backdrop: 'static', keyboard: false, size: 'lg'};
  dialogSignalConfig: any = {backdrop: 'static', keyboard: false, windowClass: 'xl'};
  dialogMemberStrategyConfig: any = {backdrop: 'static', keyboard: false, size: 'lg'};

  inProgress = true;

  configuration: any;
  timeFrame = 'ONE_HOUR';

  dateTimeRange: Date[];
  formatter = 'yyyy-MM-ddTHH:mm';

  strategyCalculationSubscription: Subscription;
  componentSubscription: Subscription;

  changes: Subject<any> = new Subject();

  strategyCalculationService: StrategyCalculationService;
  chartDrawService: ChartDrawService;
  indicatorDrawService: IndicatorDrawService;
  signalDrawService: SignalDrawService;
  signalBuildService: SignalBuilderService;
  memberStrategyService: MemberStrategyService;
  chartSaveService: ChartSaveService;

  datePipe: DatePipe;

  @ViewChild('chartContainer', {static: false}) container: ElementRef;
  chart = null;
  strategyResults: any[];

  protected constructor(strategyCalculationService: StrategyCalculationService,
                        chartDrawService: ChartDrawService,
                        indicatorDrawService: IndicatorDrawService,
                        signalDrawService: SignalDrawService,
                        chartSaveService: ChartSaveService,
                        signalBuildService: SignalBuilderService,
                        memberStrategyService: MemberStrategyService,
                        datePipe: DatePipe,
                        private modalService: NgbModal,
                        private renderer: Renderer2,
                        private route: Router,
                        private notificationService: NotificationService) {
    this.strategyCalculationService = strategyCalculationService;
    this.chartDrawService = chartDrawService;
    this.indicatorDrawService = indicatorDrawService;
    this.signalDrawService = signalDrawService;
    this.signalBuildService = signalBuildService;
    this.chartSaveService = chartSaveService;
    this.memberStrategyService = memberStrategyService;
    this.datePipe = datePipe;
  }

  ngOnInit() {
    if (this.memberStrategy == null) {
      this.initDefaultStrategyConfiguration();
    } else {
      this.initMemberStrategyConfiguration();
    }
  }

  abstract drawStrategyResult();

  abstract getDefaultConfig();

  abstract getStrategyConfigModal();

  abstract getStrategySignalModal();

  dateTimeRangeChange(dateTimeRange: Date[]) {
    this.dateTimeRange = dateTimeRange;
    this.changes.next();
  }

  timeFrameChange(timeFrame: string) {
    this.timeFrame = timeFrame;
    this.changes.next();
  }

  save(type: string) {
    this.chartSaveService.save(type, this.chart, this.getMarketName())
    this.notificationService.info('Save file');
  }

  clearDrawing() {
    this.chartDrawService.clearDrawing(this.chart);
  }

  startDrawing(event: any) {
    this.chartDrawService.startDrawing(event, this.chart);
  }

  drawMarker(event: any) {
    this.chartDrawService.drawMarker(event, this.chart);
  }

  removeSelected() {
    this.chartDrawService.removeSelectedDrawTool(this.chart);
  }

  configClick() {
    const dialog = this.modalService.open(this.getStrategyConfigModal(), this.dialogConfig);
    dialog.componentInstance.name = this.strategy.name;
    dialog.componentInstance.configuration = this.configuration.strategyConfiguration;
    dialog.componentInstance.drawConfiguration = this.configuration.drawConfiguration;
    dialog.result.then((result) => {
      if (result != 'close') {
        this.configuration = result;
        this.changes.next();
      }
    });
  }

  signalsClick() {
    const dialog = this.modalService.open(this.getStrategySignalModal(), this.dialogSignalConfig);
    dialog.componentInstance.name = this.strategy.name;
    dialog.componentInstance.data = this.buildSignalsPageSlice();
  }

  monitorClick() {
    const dialog = this.modalService.open(MemberStrategyConfigComponent, this.dialogMemberStrategyConfig);
    dialog.componentInstance.strategyName = this.strategy.name;
    dialog.componentInstance.memberStrategy = this.memberStrategy;
    dialog.result.then((result) => {
      if (result == 'close') {
        return;
      }
      this.handleMonitorResult(result);
    });
  }

  ngOnDestroy() {
    this.strategyCalculationSubscription.unsubscribe();
    this.componentSubscription.unsubscribe();
  }

  allPosition() {
    return ['ENTRY_LONG', 'EXIT_LONG', 'ENTRY_SHORT', 'EXIT_SHORT'];
  }

  drawSignals() {
    this.signals = this.signalBuildService.buildSignals(this.strategyResults);
    this.signalDrawService.draw(this.signals, this.configuration.drawConfiguration.signalConfiguration,
      this.chart, this.configuration.strategyConfiguration.positions);
  }

  private handleMonitorResult(result) {
    if (result.update) {
      this.handleUpdateMonitor(result);
    } else {
      this.handleCreateMonitor(result);
    }
  }

  private handleCreateMonitor(result) {
    const request = this.prepareMemberStrategyCreateRequest(result);
    this.memberStrategyService.create(request)
      .subscribe(memberStrategyId => {
        this.route.navigate(['monitoring/strategy', memberStrategyId]);
      })
  }

  private handleUpdateMonitor(result) {
    const request = this.prepareMemberStrategyUpdateRequest(result);
    this.memberStrategyService.update(this.memberStrategy.id, request)
      .subscribe((memberStrategy) => {
        this.notificationService.success('Monitor updated');
        this.memberStrategy = memberStrategy;
      })
  }

  private initMemberStrategyConfiguration() {
    this.initDateTimeRange();
    this.timeFrame = this.memberStrategy.timeFrame;
    this.configuration = {
      strategyConfiguration: JSON.parse(this.memberStrategy.strategyConfiguration),
      drawConfiguration: JSON.parse(this.memberStrategy.drawConfiguration)
    };
    this.subscribeToStrategyCalculation();
    this.changes.next();
  }

  private initDefaultStrategyConfiguration() {
    this.initDateTimeRange();
    this.configuration = this.getDefaultConfig();
    this.subscribeToStrategyCalculation();
    this.changes.next();
  }

  private prepareMemberStrategyCreateRequest(result): MemberStrategyRequest {
    const request = new MemberStrategyCreateRequest();
    this.prepareRequest(request, result);
    request.immediatelyStart = result.config.immediatelyStart;
    return request;
  }

  private prepareRequest(request, result) {
    request.marketId = this.market.id;
    request.setStrategyConfiguration(this.configuration.strategyConfiguration);
    request.setDrawConfiguration(this.configuration.drawConfiguration);
    request.strategyType = this.strategy.type;
    request.timeFrame = this.timeFrame;
    request.updateTimeUnit = result.config.updateTimeUnit;
    request.updateTimeValue = result.config.updateTimeValue;
    request.marketName = this.market.marketName;
    request.stock = this.market.stock;
    request.strategyName = this.strategy.name;
    request.customStrategyName = result.config.customStrategyName;
  }

  private prepareMemberStrategyUpdateRequest(result): MemberStrategyRequest {
    const request = new MemberStrategyUpdateRequest();
    this.prepareRequest(request, result);
    request.status = result.config.active ? 'ACTIVE' : 'PAUSED';
    return request;
  }

  private getMarketName() {
    return this.strategy.name + '-' + this.market.marketName + ' (' + this.market.stock + ')';
  }

  private clearChart() {
    const children = this.container.nativeElement.children;
    for (let child of children) {
      this.renderer.removeChild(this.container.nativeElement, child);
    }
  }

  private initDateTimeRange() {
    const now = new Date();
    const dateFrom = moment(now).subtract(2, 'months').toDate();
    this.dateTimeRange = [dateFrom, now];
  }

  private subscribeToStrategyCalculation() {
    this.componentSubscription = this.changes.subscribe(() => {
      this.inProgress = true;
      this.strategyCalculationSubscription = this.strategyCalculationService.calculateStrategy(this.buildStrategyCalculationRequest())
        .subscribe(result => {
            this.clearChart();
            this.strategyResults = result;
            this.buildTickDate();
            this.drawChart();
            this.drawStrategyResult();
            this.inProgress = false;
          },
          () => {
            this.inProgress = false;
          })
    });
  }

  private buildStrategyCalculationRequest() {
    this.addTimeFrame();

    const dateFrom = this.datePipe.transform(this.dateTimeRange[0], this.formatter);
    const dateTo = this.datePipe.transform(this.dateTimeRange[1], this.formatter);

    const request = new StrategyCalculationRequest();
    request.marketId = this.market.id;
    request.timeFrame = this.timeFrame;
    request.from = dateFrom;
    request.to = dateTo;
    request.strategyType = this.strategy.type;
    request.setConfiguration(this.configuration.strategyConfiguration);

    return request;
  }

  private addTimeFrame() {
    if (this.strategy.type == 'BILL_WILLIAMS_STRATEGY') {
      this.configuration.strategyConfiguration.alligatorTimeFrame = this.timeFrame;
    }
  }

  private drawChart() {
    const tickData = this.buildTickDate();
    const tickForChart = this.prepareData(tickData);
    this.chart = this.chartDrawService.draw(tickData, tickForChart, this.container);
  }

  private buildTickDate() {
    const tickData = new TickData();
    tickData.market = this.market;
    tickData.timeFrame = TimeFrame[this.timeFrame];
    tickData.ticks = this.extractTicks();
    return tickData;
  }

  private extractTicks() {
    const ticks = [];
    this.strategyResults.forEach(result => ticks.push(result.tick));
    return ticks;
  }

  private prepareData(tickData: TickData) {
    const tickForChart = [];
    this.dateTimeRange.push(new Date(tickData.ticks[0].tickTime));
    this.dateTimeRange.push(new Date(tickData.ticks[tickData.ticks.length - 1].tickTime));
    tickData.ticks.forEach(tick => {
      tickForChart.push([tick.tickTime, this.convertValue(tick.open), this.convertValue(tick.high), this.convertValue(tick.low), this.convertValue(tick.close)])
    });
    return tickForChart;
  }

  private convertValue(indicatorResult) {
    return Number.parseFloat(indicatorResult).toFixed(10);
  }

  private buildSignalsPageSlice() {
    const filteredSignals = [];
    this.signals.forEach(signal => {
      if (signal.positions !== null && signal.positions.size > 0) {
        filteredSignals.push(signal);
      }
    });
    return {
      content: filteredSignals,
      last: true,
      totalElements: filteredSignals.length,
      totalPages: 1,
      first: true,
      numberOfElements: filteredSignals.length,
      size: filteredSignals.length
    }
  }

}
