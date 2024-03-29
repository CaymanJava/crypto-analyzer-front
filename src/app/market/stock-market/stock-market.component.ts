import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subject, Subscription } from "rxjs";
import { TickService } from "../../core/tick/tick.service";
import { TickData, TickPeriodRequest, TickTimeRequest } from "../../core/tick/tick.model";
import { DatePipe } from "@angular/common";
import { IndicatorService } from "../../core/indicator/indicator.service";
import { IndicatorCalculationRequest, IndicatorConfigurationHandler, IndicatorDrawResult, IndicatorItem, IndicatorSettings } from "../../core/indicator/indicator.model";
import { IndicatorConfigService } from "../../core/indicator/indicator-config.service";
import { ChartDrawService } from "../../core/chart/chart-draw.service";
import { ChartSaveService } from "../../core/chart/chart.save.service";
import { IndicatorDrawService } from "../../core/indicator/indicator-draw.service";
import { IndicatorTypeProviderService } from "../../core/indicator/indicator-type-provider.service";
import { NotificationService } from "../../shared/services/notification.service";

@Component({
  selector: 'app-stock-market',
  templateUrl: './stock-market.component.html',
  styleUrls: [
    './stock-market.component.scss'
  ],
  providers: [
    DatePipe,
    IndicatorConfigService
  ]
})
export class StockMarketComponent implements OnInit, OnDestroy {

  currentMarketSubscription: Subscription;
  tickDataSubscription: Subscription;
  componentSubscription: Subscription;
  changes: Subject<any> = new Subject();

  marketId: number;
  timeFrame = 'ONE_HOUR';
  tickData: TickData;
  formatter = 'yyyy-MM-ddTHH:mm';
  dateTimeRange: Date[] = [];
  hideDrawingTools = true;
  indicatorConfigurationHandlers: IndicatorConfigurationHandler[] = [];
  currentPlotNumber = 0;
  updatedConfigHandler: IndicatorConfigurationHandler;

  @ViewChild('chartContainer', {static: false}) container: ElementRef;
  chart = null;

  constructor(private activatedRoute: ActivatedRoute,
              private tickService: TickService,
              private indicatorService: IndicatorService,
              private chartDrawService: ChartDrawService,
              private chartSaveService: ChartSaveService,
              private indicatorDrawService: IndicatorDrawService,
              private indicatorConfigProvider: IndicatorConfigService,
              private indicatorTypeProviderService: IndicatorTypeProviderService,
              private notificationService: NotificationService,
              private datePipe: DatePipe,
              private renderer: Renderer2) {
    this.currentMarketSubscription = activatedRoute.params.subscribe(params => {
      this.marketId = +params['marketId'];
    });
  }

  ngOnInit() {
    this.subscribeToIndicatorConfig();
    this.subscribeToTickData();
    this.changes.next('period');
  }

  ngOnDestroy() {
    this.currentMarketSubscription.unsubscribe();
    this.componentSubscription.unsubscribe();
    this.tickDataSubscription.unsubscribe();
    this.changes.unsubscribe();
    this.indicatorConfigProvider.indicatorSettingSubject.unsubscribe();
    this.indicatorConfigProvider.indicatorRemoveSubject.unsubscribe();
  }

  startDrawing(event: any) {
    this.chartDrawService.startDrawing(event, this.chart);
  }

  drawMarker(event: any) {
    this.chartDrawService.drawMarker(event, this.chart);
  }

  clear() {
    this.chartDrawService.clearDrawing(this.chart);
  }

  removeSelected() {
    this.chartDrawService.removeSelectedDrawTool(this.chart);
  }

  onDataRangeChange(event: any) {
    this.dateTimeRange = event;
    this.changes.next('time');
  }

  onTimeFrameChange(event: any) {
    this.timeFrame = event;
    this.dateTimeRange = [this.dateTimeRange[0], new Date()];
    this.changes.next('time');
  }

  onDrawClick() {
    this.hideDrawingTools = !this.hideDrawingTools;
  }

  onSave(type: string) {
    this.chartSaveService.save(type, this.chart, this.getMarketName());
    this.notificationService.info('Saving file');
  }

  onIndicatorSelected(indicatorItem: IndicatorItem) {
    this.indicatorConfigProvider.open(indicatorItem, false);
  }

  clearIndicators() {
    this.disposeIndicatorsPlot();
    this.refreshAddedIndicatorsValues();
    this.clearMainPlot();
    this.clearAndRedrawChart();
  }

  addIndicator(indicatorSettings: IndicatorSettings) {
    const request = this.prepareIndicatorRequest(indicatorSettings);
    this.indicatorService.calculateIndicator(request).subscribe(
      (result: any[]) => {
        const drawData: IndicatorDrawResult = this.indicatorDrawService.draw(indicatorSettings, result, this.chart, this.container, this.currentPlotNumber);
        this.indicatorConfigurationHandlers.push(
          new IndicatorConfigurationHandler(
            drawData.title, drawData.plotNumber, indicatorSettings.indicatorItem,
            indicatorSettings.configuration, indicatorSettings.drawConfiguration,
            result
          ));
        this.updateCurrentPlotNumber(drawData);
      }
    );
  }

  onIndicatorConfigChange(configHandler: IndicatorConfigurationHandler) {
    this.recalculateIndicator(configHandler);
  }

  private recalculateIndicator(configHandler: IndicatorConfigurationHandler) {
    this.updatedConfigHandler = configHandler;
    this.indicatorConfigProvider.open(configHandler.indicatorItem, true, configHandler.configuration,
      configHandler.drawConfiguration, configHandler.id);
  }

  private clearMainPlot() {
    if (this.chart != null) {
      this.chart.plot(0).removeAllSeries();
    }
  }

  private disposeIndicatorsPlot() {
    for (let i = this.currentPlotNumber; i >= 1; i--) {
      this.chart.plot(i).dispose();
    }
  }

  private refreshAddedIndicatorsValues() {
    this.currentPlotNumber = 0;
    this.indicatorConfigurationHandlers = [];
  }

  private updateIndicator(settings: IndicatorSettings) {
    const request = this.prepareIndicatorRequest(settings);
    this.indicatorService.calculateIndicator(request).subscribe(
      (result: any[]) => {
        let drawResult = this.updateIndicators(settings, result);
        this.updateLabels(drawResult, settings);
        this.updatedConfigHandler = null;
      }
    );
  }

  private updateLabels(drawResult, settings: IndicatorSettings) {
    this.indicatorConfigurationHandlers.forEach(indicatorConfiguration => {
      if (this.updatedConfigHandler == indicatorConfiguration) {
        indicatorConfiguration.shortLabel = drawResult.title;
        indicatorConfiguration.configuration = settings.configuration;
        indicatorConfiguration.drawConfiguration = settings.drawConfiguration;
      }
    });
  }

  private updateIndicators(settings: IndicatorSettings, result: any[]) {
    if (this.updatedConfigHandler.plotNumber == 0) {
      this.chart.plot(0).removeAllSeries();
      this.redrawChart();
      this.chartDrawService.clearDrawing(this.chart);
      this.updateAllZeroPlotIndicators();
      return this.indicatorDrawService.update(settings, result, this.chart, this.updatedConfigHandler.plotNumber);
    } else {
      return this.indicatorDrawService.update(settings, result, this.chart, this.updatedConfigHandler.plotNumber);
    }
  }

  private prepareIndicatorRequest(settings: IndicatorSettings) {
    const dateFrom = this.datePipe.transform(this.dateTimeRange[0], this.formatter);
    const dateTo = this.datePipe.transform(this.dateTimeRange[1], this.formatter);
    const request = new IndicatorCalculationRequest();
    request.marketId = this.marketId;
    request.timeFrame = this.timeFrame;
    request.from = dateFrom;
    request.to = dateTo;
    request.indicatorType = this.indicatorTypeProviderService.recognize(settings);
    request.setConfiguration(settings.configuration);
    return request;
  }

  private subscribeToIndicatorConfig() {
    this.indicatorConfigProvider.indicatorSettingSubject.subscribe((settings: IndicatorSettings) => {
      this.addAdditionalParams(settings);
      if (settings.update) {
        this.updateIndicator(settings);
      } else {
        this.addIndicator(settings);
      }
    });
    this.indicatorConfigProvider.indicatorRemoveSubject.subscribe((id) => {
      if (this.updatedConfigHandler.id === id) {
        if (this.updatedConfigHandler.plotNumber === 0) {
          this.removeZeroPlotIndicator();
        } else {
          this.removeNonZeroPlotIndicator();
        }
      }
    });
  }

  private removeZeroPlotIndicator() {
    this.removeIndicatorHandler();
    this.chart.plot(0).removeAllSeries();
    this.clear();
    this.redrawChart();
    this.updateAllZeroPlotIndicators();
    this.updatedConfigHandler = null;
  }

  private removeIndicatorHandler() {
    const index = this.indicatorConfigurationHandlers.indexOf(this.updatedConfigHandler);
    this.indicatorConfigurationHandlers.splice(index, 1);
  }

  private removeNonZeroPlotIndicator() {
    this.indicatorDrawService.deleteNonZeroPlotChart(this.chart, this.container, this.updatedConfigHandler.plotNumber);
    this.removeIndicatorHandler();
    this.decreasePlotNumbers();
    this.updatedConfigHandler = null;
  }

  private decreasePlotNumbers() {
    this.currentPlotNumber = this.currentPlotNumber - 1;
    this.indicatorConfigurationHandlers.forEach(configHandler => {
        if (configHandler.plotNumber > this.updatedConfigHandler.plotNumber) {
          configHandler.plotNumber = configHandler.plotNumber - 1;
        }
      }
    );
  }

  private subscribeToTickData() {
    this.componentSubscription = this.changes.subscribe((event) => {
      switch (event) {
        case 'period': {
          this.subscribeToTickByPeriod();
          break;
        }
        case 'time': {
          this.subscribeToTickByTime();
          break;
        }
      }
    });
  }

  private subscribeToTickByTime() {
    const dateFrom = this.datePipe.transform(this.dateTimeRange[0], this.formatter);
    const dateTo = this.datePipe.transform(this.dateTimeRange[1], this.formatter);
    this.tickDataSubscription = this.tickService.getTicksByTime(new TickTimeRequest(this.marketId, this.timeFrame, dateFrom, dateTo))
      .subscribe(tickData => {
          this.clearChart();
          this.tickData = tickData;
          this.drawChart();
          this.refreshAddedIndicatorsValues();
        });
  }

  private subscribeToTickByPeriod() {
    this.tickDataSubscription = this.tickService.getTicksByPeriod(TickPeriodRequest.defaultCountRequest(this.marketId, this.timeFrame))
      .subscribe(tickData => {
          this.clearChart();
          this.tickData = tickData;
          this.drawChart();
          this.refreshAddedIndicatorsValues();
        });
  }

  private drawChart() {
    const tickForChart = this.prepareData();
    this.chart = this.chartDrawService.draw(this.tickData, tickForChart, this.container);
  }

  private updateAllZeroPlotIndicators() {
    this.indicatorConfigurationHandlers.forEach(configHandler => {
        if (configHandler.plotNumber == 0 && configHandler.id != this.updatedConfigHandler.id) {
          this.indicatorDrawService.update(new IndicatorSettings(configHandler.indicatorItem,
            configHandler.configuration, configHandler.drawConfiguration, true),
            configHandler.data, this.chart, 0);
        }
      }
    );
  }

  private redrawChart() {
    const tickForChart = this.prepareData();
    this.chartDrawService.redraw(this.chart, this.tickData, tickForChart, this.container);
  }

  private clearAndRedrawChart() {
    this.clearChart();
    this.drawChart();
  }

  private clearChart() {
    this.dateTimeRange = [];
    const children = this.container.nativeElement.children;
    for (let child of children) {
      this.renderer.removeChild(this.container.nativeElement, child);
    }
  }

  private prepareData() {
    const tickForChart = [];
    this.dateTimeRange.push(new Date(this.tickData.ticks[0].tickTime));
    this.dateTimeRange.push(new Date(this.tickData.ticks[this.tickData.ticks.length - 1].tickTime));
    this.tickData.ticks.forEach(tick => {
      tickForChart.push([tick.tickTime, this.convertValue(tick.open), this.convertValue(tick.high), this.convertValue(tick.low), this.convertValue(tick.close)])
    });
    return tickForChart;
  }

  private convertValue(indicatorResult) {
    return Number.parseFloat(indicatorResult).toFixed(10);
  }

  private getMarketName() {
    return this.tickData.market.marketName + ' (' + this.tickData.market.stock + ')';
  }

  private updateCurrentPlotNumber(drawData: IndicatorDrawResult) {
    if (drawData.plotNumber != this.currentPlotNumber && drawData.plotNumber != 0) {
      this.currentPlotNumber = this.currentPlotNumber + 1;
    }
  }

  private addAdditionalParams(settings: IndicatorSettings) {
    if (settings.indicatorItem.title == 'ALLIGATOR') {
      settings.configuration.timeFrame = this.timeFrame;
    }
  }

}
