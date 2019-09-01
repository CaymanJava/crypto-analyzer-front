import { Component } from '@angular/core';
import { BaseStrategyTypeComponent } from "../base-strategy-type.component";
import { DatePipe } from "@angular/common";
import { IndicatorItem, IndicatorSettings } from "../../../core/indicator/indicator.model";
import { StcMaMacdConfigComponent } from "./config/stc-ma-macd-config.component";
import { StcMaMacdSignalsComponent } from "./signals/stc-ma-macd-signals.component";

@Component({
  selector: 'app-stc-ma-macd',
  templateUrl: './stc-ma-macd.component.html',
  providers: [
    DatePipe
  ]
})
export class StcMaMacdComponent extends BaseStrategyTypeComponent {

  type = 'STC_MA_MACD';

  drawStrategyResult() {
    this.drawStc();
    this.drawMa();
    this.drawMacd();
    super.drawSignals();
  }

  getDefaultConfig() {
    return {
      strategyConfiguration: {
        stcPriceType: 'CLOSE',
        stcMaType: 'EXPONENTIAL_MOVING_AVERAGE',
        stcPeriod: 10,
        stcShortCycle: 23,
        stcLongCycle: 50,
        stcOversoldLevel: 10.0,
        stcOverboughtLevel: 90.0,
        maType: 'EXPONENTIAL_MOVING_AVERAGE',
        maPriceType: 'CLOSE',
        maPeriod: 100,
        macdMaType: 'EXPONENTIAL_MOVING_AVERAGE',
        macdPriceType: 'CLOSE',
        macdFastPeriod: 8,
        macdSlowPeriod: 17,
        macdSignalPeriod: 9,
        positions: super.allPosition()
      },
      drawConfiguration: {
        stcDrawConfiguration: {
          indicatorLineColor: '#1c1afa',
          oversold: 10,
          overbought: 90
        },
        maDrawConfiguration: {
          indicatorLineColor: '#7d13a1'
        },
        macdDrawConfiguration: {
          indicatorLineColor: '#1c1afa',
          signalLineColor: '#fa0f16',
          barChartColor: '#4e4e76'
        },
        signalConfiguration: {
          entryLongColor: '#3ba158',
          exitLongColor: '#fa0f16',
          entryShortColor: '#fa9a12',
          exitShortColor: '#4708fa',
          signalMarkerSize: 8,
          buyMarker: 'arrowUp',
          sellMarker: 'arrow-down'
        }
      }
    }
  }

  getStrategyConfigModal() {
    return StcMaMacdConfigComponent;
  }

  getStrategySignalModal() {
    return StcMaMacdSignalsComponent;
  }

  private drawStc() {
    this.indicatorDrawService.draw(this.buildStcConfig(), this.buildStcResults(), this.chart, this.container, 0);
  }

  private buildStcConfig() {
    return new IndicatorSettings(new IndicatorItem('STC'), this.getStcConfig(), this.configuration.drawConfiguration.stcDrawConfiguration, false);
  }

  private getStcConfig() {
    return {
      priceType: this.configuration.strategyConfiguration.stcPriceType,
      period: this.configuration.strategyConfiguration.stcPeriod,
      shortCycle: this.configuration.strategyConfiguration.stcShortCycle,
      longCycle: this.configuration.strategyConfiguration.stcLongCycle,
      movingAverageType: this.configuration.strategyConfiguration.stcMaType
    }
  }

  private buildStcResults() {
    const stcResults = [];
    this.strategyResults.forEach(strategyResult => stcResults.push(this.buildStcResult(strategyResult)));
    return stcResults;
  }

  private buildStcResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      indicatorValue: strategyResult.stcValue
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

}
