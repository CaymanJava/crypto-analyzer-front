import { Component } from '@angular/core';
import { BaseStrategyTypeComponent } from "../base-strategy-type.component";
import { DatePipe } from "@angular/common";
import { IndicatorItem, IndicatorSettings } from "../../../core/indicator/indicator.model";
import { PivotRsiMacdMaConfigComponent } from "./config/pivot-rsi-macd-ma-config.component";
import { PivotRsiMacdMaSignalsComponent } from "./signals/pivot-rsi-macd-ma-signals.component";

@Component({
  selector: 'app-pivot-rsi-macd-ma',
  templateUrl: './pivot-rsi-macd-ma.component.html',
  providers: [
    DatePipe
  ]
})
export class PivotRsiMacdMaComponent extends BaseStrategyTypeComponent {

  type = 'PIVOT_RSI_MACD_MA';

  drawStrategyResult() {
    this.drawPivotPoints();
    this.drawRsi();
    this.drawMacd();
    this.drawMa();
    super.drawSignals();
  }

  getDefaultConfig() {
    return {
      strategyConfiguration: {
        rsiMaType: 'SMOOTHED_MOVING_AVERAGE',
        rsiPeriod: 14,
        rsiSignalLine: 50,
        macdMaType: 'EXPONENTIAL_MOVING_AVERAGE',
        macdPriceType: 'CLOSE',
        macdFastPeriod: 8,
        macdSlowPeriod: 17,
        macdSignalPeriod: 9,
        maType: 'EXPONENTIAL_MOVING_AVERAGE',
        maPriceType: 'CLOSE',
        maPeriod: 50,
        positions: ['ENTRY_LONG', 'ENTRY_SHORT']
      },
      drawConfiguration: {
        rsiDrawConfiguration: {
          indicatorLineColor: '#1c1afa',
          oversold: 30,
          overbought: 70
        },
        macdDrawConfiguration: {
          indicatorLineColor: '#1c1afa',
          signalLineColor: '#fa0f16',
          barChartColor: '#4e4e76'
        },
        maDrawConfiguration: {
          indicatorLineColor: '#fa5d0f'
        },
        pivotDrawConfiguration: {
          pivotColor: '#1c1afa',
          firstResistanceColor: '#0cbb3b',
          secondResistanceColor: '#fa1c30',
          thirdResistanceColor: '#fa9a12',
          fourthResistanceColor: '#a00796',
          firstSupportColor: '#0cbb3b',
          secondSupportColor: '#fa1c30',
          thirdSupportColor: '#fa9a12',
          fourthSupportColor: '#a00796'
        },
        signalConfiguration: {
          entryLongColor: '#3ba158',
          entryShortColor: '#fa9a12',
          signalMarkerSize: 8,
          buyMarker: 'arrowUp',
          sellMarker: 'arrow-down'
        }
      }
    }
  }

  getStrategyConfigModal() {
    return PivotRsiMacdMaConfigComponent;
  }

  getStrategySignalModal() {
    return PivotRsiMacdMaSignalsComponent;
  }


  private drawPivotPoints() {
    this.indicatorDrawService.draw(this.buildPivotConfig(), this.buildPivotResults(), this.chart, this.container, 0);
  }

  private buildPivotConfig() {
    return new IndicatorSettings(new IndicatorItem('PIVOT'), this.getPivotConfig(), this.configuration.drawConfiguration.pivotDrawConfiguration, false);
  }

  private getPivotConfig() {
    return {
      indicatorType: 'FLOOR_PIVOT_POINTS'
    }
  }

  private buildPivotResults() {
    const pivotResults = [];
    this.strategyResults.forEach(strategyResult => pivotResults.push(this.buildPivotResult(strategyResult)));
    return pivotResults;
  }

  private buildPivotResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      pivot: strategyResult.pivot,
      firstResistance: strategyResult.firstResistance,
      secondResistance: strategyResult.secondResistance,
      thirdResistance: strategyResult.thirdResistance,
      fourthResistance: strategyResult.fourthResistance,
      firstSupport: strategyResult.firstSupport,
      secondSupport: strategyResult.secondSupport,
      thirdSupport: strategyResult.thirdSupport,
      fourthSupport: strategyResult.fourthSupport
    }
  }

  private drawRsi() {
    this.indicatorDrawService.draw(this.buildRsiConfig(), this.buildRsiResults(), this.chart, this.container, 0);
  }

  private buildRsiConfig() {
    return new IndicatorSettings(new IndicatorItem('RSI'), this.getRsiConfig(), this.configuration.drawConfiguration.rsiDrawConfiguration, false);
  }

  private getRsiConfig() {
    return {
      movingAverageType: this.configuration.strategyConfiguration.rsiMaType,
      period: this.configuration.strategyConfiguration.rsiPeriod,
    }
  }

  private buildRsiResults() {
    const lrsiResults = [];
    this.strategyResults.forEach(strategyResult => lrsiResults.push(this.buildRsiResult(strategyResult)));
    return lrsiResults;
  }

  private buildRsiResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      indicatorValue: strategyResult.rsiValue
    }
  }

  private drawMacd() {
    this.indicatorDrawService.draw(this.buildMacdConfig(), this.buildMacdResults(), this.chart, this.container, 1);
  }

  private buildMacdConfig() {
    return new IndicatorSettings(new IndicatorItem('MACD'), this.getMacdConfig(), this.configuration.drawConfiguration.macdDrawConfiguration, false);
  }

  private getMacdConfig() {
    return {
      movingAverageType: this.configuration.strategyConfiguration.macdMovingAverageType,
      priceType: this.configuration.strategyConfiguration.macdPriceType,
      fastPeriod: this.configuration.strategyConfiguration.macdFastPeriod,
      slowPeriod: this.configuration.strategyConfiguration.macdSlowPeriod,
      signalPeriod: this.configuration.strategyConfiguration.macdSignalPeriod,
    }
  }

  private buildMacdResults() {
    const macdResults = [];
    this.strategyResults.forEach(strategyResult => macdResults.push(this.buildMacdResult(strategyResult)));
    return macdResults;
  }

  private buildMacdResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      indicatorValue: strategyResult.macdValue,
      signalLineValue: strategyResult.macdSignalLineValue,
      barChartValue: strategyResult.macdBarChartValue
    }
  }

  private drawMa() {
    this.indicatorDrawService.draw(this.buildMaConfig(), this.buildMaResults(), this.chart, this.container, 0);
  }

  private buildMaConfig() {
    return new IndicatorSettings(new IndicatorItem('MA'), this.getMaConfig(), this.configuration.drawConfiguration.maDrawConfiguration, false);
  }

  private getMaConfig() {
    return {
      indicatorType: this.configuration.strategyConfiguration.maType,
      priceType: this.configuration.strategyConfiguration.maPriceType,
      period: this.configuration.strategyConfiguration.maPeriod
    }
  }

  private buildMaResults() {
    const maResults = [];
    this.strategyResults.forEach(strategyResult => maResults.push(this.buildMaResult(strategyResult)));
    return maResults;
  }

  private buildMaResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      indicatorValue: strategyResult.maValue
    }
  }

}
