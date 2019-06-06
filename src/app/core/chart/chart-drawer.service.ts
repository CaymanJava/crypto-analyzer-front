import * as AnyChart from "anychart";
import { TickData } from "../tick/tick.model";
import { ElementRef, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ChartDrawerService {

  draw(tickData: TickData, tickForChart: any[], container: ElementRef) {
    const chart = AnyChart.stock(0);
    const mapping = this.mapData(tickForChart);
    this.configureDateFormat();
    this.configureTooltips(chart);
    this.configurePrices(chart, mapping, tickData);
    this.configurePlot(chart, tickData);
    this.setConfiguration(chart, container);
    return chart;
  }

  redraw(chart: any, tickData: TickData, tickForChart: any[], container: ElementRef) {
    const mapping = this.mapData(tickForChart);
    this.configureDateFormat();
    this.configureTooltips(chart);
    this.configurePrices(chart, mapping, tickData);
    this.configurePlot(chart, tickData);
    this.prepareDefaultConfiguration(chart, container);
  }

  startDrawing(event: any, chart: any) {
    chart.plot(0).annotations().startDrawing({
      type: event.drawType,
      color: event.color
    });
  }

  clearDrawing(chart: any) {
    chart.plot(0).annotations().removeAllAnnotations();
  }

  removeSelectedDrawTool(chart: any) {
    const selectedAnnotation = chart.plot(0).annotations().getSelectedAnnotation();
    chart.plot(0).annotations().removeAnnotation(selectedAnnotation);
  }

  private mapData(tickForChart: any[]) {
    const table = AnyChart.data.table();
    table.addData(tickForChart);
    return table.mapAs({
      x: 0,
      open: 1,
      high: 2,
      low: 3,
      close: 4
    });
  }

  private configureDateFormat() {
    AnyChart.format.outputDateTimeFormat('HH:mm, dd MMM yyyy');
    AnyChart.format.outputTimezone(new Date().getTimezoneOffset());
  }

  private configureTooltips(chart) {
    const tooltip = chart.tooltip();
    tooltip.titleFormat(function () {
      return AnyChart.format.dateTime(this.x)
    });
  }

  private configurePrices(chart, mapping, tickData: TickData) {
    const prices = chart.plot(0).candlestick(mapping);
    prices.name(tickData.market.marketName);
    prices.risingStroke('#3ba158');
    prices.risingFill('#3ba158');
    prices.fallingStroke('#fa1a20');
    prices.fallingFill('#fa0f16');
  }

  private configurePlot(chart, tickData: TickData) {
    chart.plot(0).xGrid().enabled(true);
    chart.plot(0).yGrid().enabled(true);
    chart.plot(0).yGrid().stroke("#dee2e6");
    chart.plot(0).legend().titleFormat(
      "{%value}{dateTimeFormat: HH:mm dd MMM yyyy}"
    );
    chart.title(this.getMarketName(tickData));
  }

  private setConfiguration(chart, container: ElementRef) {
    this.prepareDefaultConfiguration(chart, container);
    container.nativeElement.style.height = '600px';
  }

  private prepareDefaultConfiguration(chart, container: ElementRef) {
    chart.container(container.nativeElement);
    chart.scroller(true);
    chart.draw();
  }

  private getMarketName(tickData: TickData) {
    return tickData.market.marketName + ' (' + tickData.market.stock + ')\n' + tickData.market.marketCurrencyLong;
  }

}
