import { Component } from '@angular/core';
import { DatePipe } from "@angular/common";
import { IndicatorItem, IndicatorSettings } from "../../../core/indicator/indicator.model";
import { RsiEisMaConfigComponent } from "./config/rsi-eis-ma-config.component";
import { RsiEisMaSignalsComponent } from "./signals/rsi-eis-ma-signals.component";
import { BaseStrategyTypeComponent } from "../../../shared/components/strategy/base/base-strategy-type.component";

@Component({
  selector: 'app-rsi-eis-ma',
  templateUrl: './rsi-eis-ma.component.html',
  providers: [
    DatePipe
  ]
})
export class RsiEisMaComponent extends BaseStrategyTypeComponent {

  drawStrategyResult() {
    this.drawRsi();
    this.drawEis();
    this.drawFastMa();
    this.drawSlowMa();
    super.drawSignals();
  }

  getDefaultConfig() {
    return {
      strategyConfiguration: {
        rsiMaType: 'SMOOTHED_MOVING_AVERAGE',
        rsiPeriod: 14,
        rsiSignalLine: 50,
        eisMaPeriod: 13,
        eisMaType: 'EXPONENTIAL_MOVING_AVERAGE',
        eisMaPriceType: 'CLOSE',
        eisMacdMaType: 'EXPONENTIAL_MOVING_AVERAGE',
        eisMacdPriceType: 'CLOSE',
        eisMacdFastPeriod: 12,
        eisMacdSlowPeriod: 26,
        eisMacdSignalPeriod: 9,
        fastMaType: 'EXPONENTIAL_MOVING_AVERAGE',
        fastMaPriceType: 'CLOSE',
        fastMaPeriod: 5,
        slowMaType: 'EXPONENTIAL_MOVING_AVERAGE',
        slowMaPriceType: 'CLOSE',
        slowMaPeriod: 10,
        positions: ['ENTRY_LONG', 'ENTRY_SHORT']
      },
      drawConfiguration: {
        rsiDrawConfiguration: {
          indicatorLineColor: '#1c1afa',
          oversold: 30,
          overbought: 70
        },
        fastMaDrawConfiguration: {
          indicatorLineColor: '#7d13a1'
        },
        slowMaDrawConfiguration: {
          indicatorLineColor: '#fa5d0f'
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
    return RsiEisMaConfigComponent;
  }

  getStrategySignalModal() {
    return RsiEisMaSignalsComponent;
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

  private drawEis() {
    this.indicatorDrawService.draw(this.buildEisConfig(), this.buildEisResults(), this.chart, this.container, 1);
  }

  private buildEisConfig() {
    return new IndicatorSettings(new IndicatorItem('EIS'), this.getEisConfig(), {}, false);
  }

  private getEisConfig() {
    return {
      maPeriod: this.configuration.strategyConfiguration.eisMaPeriod,
      maType: this.configuration.strategyConfiguration.eisMaType,
      maPriceType: this.configuration.strategyConfiguration.eisMaPriceType,
      macdMaType: this.configuration.strategyConfiguration.eisMacdMaType,
      macdPriceType: this.configuration.strategyConfiguration.eisMacdPriceType,
      macdFastPeriod: this.configuration.strategyConfiguration.eisMacdFastPeriod,
      macdSlowPeriod: this.configuration.strategyConfiguration.eisMacdSlowPeriod,
      macdSignalPeriod: this.configuration.strategyConfiguration.eisMacdSignalPeriod
    }
  }

  private buildEisResults() {
    const eisResults = [];
    this.strategyResults.forEach(strategyResult => eisResults.push(this.buildEisResult(strategyResult)));
    return eisResults;
  }

  private buildEisResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      barColor: strategyResult.eisBarColor
    }
  }

  private drawFastMa() {
    this.indicatorDrawService.draw(this.buildFastMaConfig(), this.buildFastMaResults(), this.chart, this.container, 0);
  }

  private buildFastMaConfig() {
    return new IndicatorSettings(new IndicatorItem('MA'), this.getFastMaConfig(), this.configuration.drawConfiguration.fastMaDrawConfiguration, false);
  }

  private getFastMaConfig() {
    return {
      indicatorType: this.configuration.strategyConfiguration.fastMaType,
      priceType: this.configuration.strategyConfiguration.fastMaPriceType,
      period: this.configuration.strategyConfiguration.fastMaPeriod
    }
  }

  private buildFastMaResults() {
    const fastMaResults = [];
    this.strategyResults.forEach(strategyResult => fastMaResults.push(this.buildFastMaResult(strategyResult)));
    return fastMaResults;
  }

  private buildFastMaResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      indicatorValue: strategyResult.fastMaValue
    }
  }

  private drawSlowMa() {
    this.indicatorDrawService.draw(this.buildSlowMaConfig(), this.buildSlowMaResults(), this.chart, this.container, 0);
  }

  private buildSlowMaConfig() {
    return new IndicatorSettings(new IndicatorItem('MA'), this.getSlowMaConfig(), this.configuration.drawConfiguration.slowMaDrawConfiguration, false);
  }

  private getSlowMaConfig() {
    return {
      indicatorType: this.configuration.strategyConfiguration.slowMaType,
      priceType: this.configuration.strategyConfiguration.slowMaPriceType,
      period: this.configuration.strategyConfiguration.slowMaPeriod
    }
  }

  private buildSlowMaResults() {
    const slowMaResults = [];
    this.strategyResults.forEach(strategyResult => slowMaResults.push(this.buildSlowMaResult(strategyResult)));
    return slowMaResults;
  }

  private buildSlowMaResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      indicatorValue: strategyResult.slowMaValue
    }
  }
}
