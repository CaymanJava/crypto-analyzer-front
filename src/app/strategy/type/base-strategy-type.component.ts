import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { Market } from "../../core/market/market.model";
import { TickData, TimeFrame } from "../../core/tick/tick.model";
import { StrategyCalculationService } from "../../core/strategy/strategy-calculation.service";
import { ChartDrawerService } from "../../core/chart/chart-drawer.service";
import { DatePipe } from "@angular/common";
import { Strategy, StrategyCalculationRequest } from "../../core/strategy/strategy.model";
import { IndicatorDrawService } from "../../core/indicator/indicator-draw.service";
import { SignalDrawService } from "../../core/signal/signal-draw.service";
import { ChartSaveService } from "../../core/chart/chart.save.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Signal } from "../../core/signal/signal.model";

@Component({
  moduleId: module.id,
  template: ''
})
export abstract class BaseStrategyTypeComponent implements OnInit, OnDestroy {

  @Input() market: Market;
  @Input() strategy: Strategy;

  signals: Signal[];

  dialogConfig: any = {backdrop: 'static', keyboard: false, size: 'lg'};
  dialogSignalConfig: any = {backdrop: 'static', keyboard: false, windowClass: 'xl'};

  inProgress = true;
  dateTimeRange: Date[];
  timeFrame = 'ONE_HOUR';
  formatter = 'yyyy-MM-ddTHH:mm';
  type;
  configuration: any;

  strategyCalculationSubscription: Subscription;
  componentSubscription: Subscription;
  changes: Subject<any> = new Subject();

  strategyCalculationService: StrategyCalculationService;
  chartDrawerService: ChartDrawerService;
  indicatorDrawerService: IndicatorDrawService;
  signalDrawService: SignalDrawService;
  chartSaveService: ChartSaveService;
  datePipe: DatePipe;

  @ViewChild('chartContainer') container: ElementRef;
  chart = null;
  strategyResults: any[];

  protected constructor(strategyCalculationService: StrategyCalculationService,
                        chartDrawerService: ChartDrawerService,
                        indicatorDrawerService: IndicatorDrawService,
                        signalDrawService: SignalDrawService,
                        chartSaveService: ChartSaveService,
                        datePipe: DatePipe,
                        private modalService: NgbModal,
                        private renderer: Renderer2) {
    this.strategyCalculationService = strategyCalculationService;
    this.chartDrawerService = chartDrawerService;
    this.indicatorDrawerService = indicatorDrawerService;
    this.signalDrawService = signalDrawService;
    this.chartSaveService = chartSaveService;
    this.datePipe = datePipe;
  }

  ngOnInit() {
    this.initDateTimeRange();
    this.configuration = this.getDefaultConfig();
    this.subscribeToStrategyCalculation();
    this.changes.next();
  }

  abstract ngOnDestroy();

  abstract drawStrategyResult();

  abstract getDefaultConfig();

  abstract getStrategyConfigModel();

  abstract getStrategySignalModel();

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
  }

  clearDrawing() {
    this.chartDrawerService.clearDrawing(this.chart);
  }

  startDrawing(event: any) {
    this.chartDrawerService.startDrawing(event, this.chart);
  }

  drawMarker(event: any) {
    this.chartDrawerService.drawMarker(event, this.chart);
  }

  removeSelected() {
    this.chartDrawerService.removeSelectedDrawTool(this.chart);
  }

  configClick() {
    const dialog = this.modalService.open(this.getStrategyConfigModel(), this.dialogConfig);
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
    const dialog = this.modalService.open(this.getStrategySignalModel(), this.dialogSignalConfig);
    dialog.componentInstance.name = this.strategy.name;
    dialog.componentInstance.data = this.buildSignalsPageSlice();
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
    this.dateTimeRange = [new Date(new Date().setMonth(now.getMonth() - 1)), now];
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
    this.configuration.strategyConfiguration.alligatorTimeFrame = this.timeFrame;
    const dateFrom = this.datePipe.transform(this.dateTimeRange[0], this.formatter);
    const dateTo = this.datePipe.transform(this.dateTimeRange[1], this.formatter);

    const request = new StrategyCalculationRequest();
    request.marketId = this.market.id;
    request.timeFrame = this.timeFrame;
    request.from = dateFrom;
    request.to = dateTo;
    request.strategyType = this.type;
    request.setConfiguration(this.configuration.strategyConfiguration);

    return request;
  }

  private drawChart() {
    const tickData = this.buildTickDate();
    const tickForChart = this.prepareData(tickData);
    this.chart = this.chartDrawerService.draw(tickData, tickForChart, this.container);
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
