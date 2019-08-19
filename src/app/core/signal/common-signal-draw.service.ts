import { Signal } from "./signal.model";
import * as AnyChart from "anychart";

export abstract class CommonSignalDrawService {

  abstract extractSignalValue(indicatorResult): string;

  abstract getTitle(): string;

  abstract getPosition(): string;

  draw(signals: Signal[], drawConfiguration: any, chart: any) {
    const indicatorPlot = chart.plot(0);
    const signalsData = this.prepareSignalsData(signals);
    const signalMapping = this.addData(signalsData);
    return indicatorPlot.marker(signalMapping);
  }

  convertValue(indicatorValue) {
    return Number.parseFloat(indicatorValue).toFixed(10);
  }

  addData(indicatorData) {
    const indicator = AnyChart.data.table(0);
    indicator.addData(indicatorData);
    return indicator.mapAs({'value': 1});
  }

  getSellSignalValue(indicatorResult: Signal) {
    if (indicatorResult.positions.size > 0 && indicatorResult.positions.has(this.getPosition())) {
      return this.convertValue(indicatorResult.tick.high * 1.03);
    }
    return null;
  }

  getBuySignalValue(indicatorResult: Signal) {
    if (indicatorResult.positions.size > 0 && indicatorResult.positions.has(this.getPosition())) {
      return this.convertValue(indicatorResult.tick.low * 0.97);
    }
    return null;
  }

  configurePlot(marker, markerSize, markerColor, series) {
    series.name(this.getTitle());
    series.normal().size(markerSize);
    series.normal().fill(markerColor);
    series.normal().stroke(markerColor);
    series.normal().type(marker);
  }

  private prepareSignalsData(result: Signal[]) {
    const signalsData = [];
    result.forEach(indicatorResult => {
      if (indicatorResult.positions.has(this.getPosition())) {
        signalsData.push(
          [
            indicatorResult.tick.tickTime,
            this.extractSignalValue(indicatorResult),
            indicatorResult.positions.has(this.getPosition())
          ]
        )
      }
    });
    return signalsData;
  }

}
