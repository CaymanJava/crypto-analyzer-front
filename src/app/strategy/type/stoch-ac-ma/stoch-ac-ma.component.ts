import { Component } from '@angular/core';
import { DatePipe } from "@angular/common";
import { IndicatorItem, IndicatorSettings } from "../../../core/indicator/indicator.model";
import { StochAcMaConfigComponent } from "./config/stoch-ac-ma-config.component";
import { StochAcMaSignalsComponent } from "./signals/stoch-ac-ma-signals.component";
import { BaseStrategyTypeComponent } from "../../../shared/components/strategy/base/base-strategy-type.component";

@Component({
  selector: 'app-stoch-ac-ma',
  templateUrl: './stoch-ac-ma.component.html',
  providers: [
    DatePipe
  ]
})
export class StochAcMaComponent extends BaseStrategyTypeComponent {

  drawStrategyResult() {
    this.drawAc();
    this.drawStochAc();
    this.drawMa();
    super.drawSignals();
  }

  getDefaultConfig() {
    return {
      strategyConfiguration: {
        acSlowPeriod: 34,
        acFastPeriod: 5,
        acSmoothedPeriod: 5,
        stochMovingAverageType: 'SIMPLE_MOVING_AVERAGE',
        stochFastPeriod: 14,
        stochSlowPeriod: 3,
        stochOversoldLevel: 20,
        stochOverboughtLevel: 80,
        maPeriod: 30,
        movingAverageType: 'SIMPLE_MOVING_AVERAGE',
        maPriceType: 'CLOSE',
        positions: ['ENTRY_LONG', 'ENTRY_SHORT']
      },
      drawConfiguration: {
        stochDrawConfiguration: {
          fastStochasticColor: '#1c1afa',
          slowStochasticColor: '#fa0f16',
          overbought: 80,
          oversold: 20
        },
        maDrawConfiguration: {
          indicatorLineColor: '#7d13a1'
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
    return StochAcMaConfigComponent;
  }

  getStrategySignalModal() {
    return StochAcMaSignalsComponent;
  }

  private drawAc() {
    this.indicatorDrawService.draw(this.buildAcConfig(), this.buildAcResults(), this.chart, this.container, 0);
  }

  private buildAcConfig() {
    return new IndicatorSettings(new IndicatorItem('AC'), this.getAcConfig(), {}, false);
  }

  private getAcConfig() {
    return {
      slowPeriod: this.configuration.strategyConfiguration.acSlowPeriod,
      fastPeriod: this.configuration.strategyConfiguration.acFastPeriod,
      smoothedPeriod: this.configuration.strategyConfiguration.acSmoothedPeriod
    }
  }

  private buildAcResults() {
    const acResults = [];
    this.strategyResults.forEach(strategyResult => acResults.push(this.buildAcResult(strategyResult)));
    return acResults;
  }

  private buildAcResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      indicatorValue: strategyResult.acValue,
      increased: strategyResult.acIncreased
    }
  }

  private drawStochAc() {
    this.indicatorDrawService.draw(this.buildStochAcConfig(), this.buildStochAcResults(), this.chart, this.container, 1);
  }

  private buildStochAcConfig() {
    return new IndicatorSettings(new IndicatorItem('STOCH'), this.getStochAcConfig(), this.configuration.drawConfiguration.stochDrawConfiguration, false);
  }

  private getStochAcConfig() {
    return {
      fastStochPeriod: this.configuration.strategyConfiguration.stochFastPeriod,
      slowStochPeriod: this.configuration.strategyConfiguration.stochSlowPeriod,
      movingAverageType: this.configuration.strategyConfiguration.stochMovingAverageType,
    }
  }

  private buildStochAcResults() {
    const stochAcResults = [];
    this.strategyResults.forEach(strategyResult => stochAcResults.push(this.buildStochAcResult(strategyResult)));
    return stochAcResults;
  }

  private buildStochAcResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      fastStochastic: strategyResult.fastStochasticAcValue,
      slowStochastic: strategyResult.slowStochasticAcValue,
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
