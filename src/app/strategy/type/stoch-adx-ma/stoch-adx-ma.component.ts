import { Component } from '@angular/core';
import { BaseStrategyTypeComponent } from "../base-strategy-type.component";
import { DatePipe } from "@angular/common";
import { IndicatorItem, IndicatorSettings } from "../../../core/indicator/indicator.model";
import { StochAdxMaConfigComponent } from "./config/stoch-adx-ma-config.component";
import { StochAdxMaSignalsComponent } from "./stoch-adx-ma-signals/stoch-adx-ma-signals.component";

@Component({
  selector: 'app-stoch-adx-ma',
  templateUrl: './stoch-adx-ma.component.html',
  providers: [
    DatePipe
  ]
})
export class StochAdxMaComponent extends BaseStrategyTypeComponent {

  type = 'STOCH_ADX_MA';

  drawStrategyResult() {
    this.drawStochastic();
    this.drawAdx();
    this.drawFirstMa();
    this.drawSecondMa();
    this.drawThirdMa();
    super.drawSignals();
  }

  getDefaultConfig() {
    return {
      strategyConfiguration: {
        stochMovingAverageType: 'MODIFIED_MOVING_AVERAGE',
        stochFastPeriod: 5,
        stochSlowPeriod: 3,
        stochasticSignalLine: 50,
        adxPeriod: 14,
        adxSignalLine: 20,
        firstMaPeriod: 5,
        secondMaPeriod: 15,
        thirdMaPeriod: 30,
        positions: ['ENTRY_LONG', 'ENTRY_SHORT']
      },
      drawConfiguration: {
        stochDrawConfiguration: {
          fastStochasticColor: '#1c1afa',
          slowStochasticColor: '#fa0f16',
          overbought: 80,
          oversold: 20
        },
        adxDrawConfiguration: {
          positiveDiLineColor: '#3ba158',
          negativeDiLineColor: '#fa0f16',
          indicatorLineColor: '#1c1afa'
        },
        firstMaDrawConfiguration: {
          indicatorLineColor: '#7d13a1'
        },
        secondMaDrawConfiguration: {
          indicatorLineColor: '#1da10d'
        },
        thirdMaDrawConfiguration: {
          indicatorLineColor: '#129fa1'
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
    return StochAdxMaConfigComponent;
  }

  getStrategySignalModal() {
    return StochAdxMaSignalsComponent;
  }

  private drawStochastic() {
    this.indicatorDrawService.draw(this.buildStochasticConfig(), this.buildStochasticResults(), this.chart, this.container, 0);
  }

  private buildStochasticConfig() {
    return new IndicatorSettings(new IndicatorItem('STOCH'), this.getStochasticConfig(), this.configuration.drawConfiguration.stochDrawConfiguration, false);
  }

  private getStochasticConfig() {
    return {
      fastStochPeriod: this.configuration.strategyConfiguration.stochFastPeriod,
      slowStochPeriod: this.configuration.strategyConfiguration.stochSlowPeriod,
      movingAverageType: this.configuration.strategyConfiguration.stochMovingAverageType,
    }
  }

  private buildStochasticResults() {
    const stochasticResults = [];
    this.strategyResults.forEach(strategyResult => stochasticResults.push(this.buildStochasticResult(strategyResult)));
    return stochasticResults;
  }

  private buildStochasticResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      fastStochastic: strategyResult.fastStochasticValue,
      slowStochastic: strategyResult.slowStochasticValue
    }
  }

  private drawAdx() {
    this.indicatorDrawService.draw(this.buildAdxConfig(), this.buildAdxResults(), this.chart, this.container, 1);
  }

  private buildAdxConfig() {
    return new IndicatorSettings(new IndicatorItem('ADX'), this.getAdxConfig(), this.configuration.drawConfiguration.adxDrawConfiguration, false);
  }

  private getAdxConfig() {
    return {
      period: this.configuration.strategyConfiguration.adxPeriod
    }
  }

  private buildAdxResults() {
    const adxResults = [];
    this.strategyResults.forEach(strategyResult => adxResults.push(this.buildAdxResult(strategyResult)));
    return adxResults;
  }

  private buildAdxResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      positiveDirectionalIndicator: strategyResult.positiveAdxValue,
      negativeDirectionalIndicator: strategyResult.negativeAdxValue,
      averageDirectionalIndex: strategyResult.averageAdxValue
    }
  }

  private drawFirstMa() {
    this.indicatorDrawService.draw(this.buildFirstMaConfig(), this.buildFirstMaResults(), this.chart, this.container, 0);
  }

  private buildFirstMaConfig() {
    return new IndicatorSettings(new IndicatorItem('MA'), this.getFirstMaConfig(), this.configuration.drawConfiguration.firstMaDrawConfiguration, false);
  }

  private getFirstMaConfig() {
    return {
      period: this.configuration.strategyConfiguration.firstMaPeriod
    }
  }

  private buildFirstMaResults() {
    const maResults = [];
    this.strategyResults.forEach(strategyResult => maResults.push(this.buildFirstMaResult(strategyResult)));
    return maResults;
  }

  private buildFirstMaResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      indicatorValue: strategyResult.firstMaValue
    }
  }

  private drawSecondMa() {
    this.indicatorDrawService.draw(this.buildSecondMaConfig(), this.buildSecondMaResults(), this.chart, this.container, 0);
  }

  private buildSecondMaConfig() {
    return new IndicatorSettings(new IndicatorItem('MA'), this.getSecondMaConfig(), this.configuration.drawConfiguration.secondMaDrawConfiguration, false);
  }

  private getSecondMaConfig() {
    return {
      period: this.configuration.strategyConfiguration.secondMaPeriod
    }
  }

  private buildSecondMaResults() {
    const maResults = [];
    this.strategyResults.forEach(strategyResult => maResults.push(this.buildSecondMaResult(strategyResult)));
    return maResults;
  }

  private buildSecondMaResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      indicatorValue: strategyResult.secondMaValue
    }
  }

  private drawThirdMa() {
    this.indicatorDrawService.draw(this.buildThirdMaConfig(), this.buildThirdMaResults(), this.chart, this.container, 0);
  }

  private buildThirdMaConfig() {
    return new IndicatorSettings(new IndicatorItem('MA'), this.getThirdMaConfig(), this.configuration.drawConfiguration.thirdMaDrawConfiguration, false);
  }

  private getThirdMaConfig() {
    return {
      period: this.configuration.strategyConfiguration.thirdMaPeriod
    }
  }

  private buildThirdMaResults() {
    const maResults = [];
    this.strategyResults.forEach(strategyResult => maResults.push(this.buildThirdMaResult(strategyResult)));
    return maResults;
  }

  private buildThirdMaResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      indicatorValue: strategyResult.thirdMaValue
    }
  }

}
