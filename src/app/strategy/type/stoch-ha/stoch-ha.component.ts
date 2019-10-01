import { Component } from '@angular/core';
import { DatePipe } from "@angular/common";
import { IndicatorItem, IndicatorSettings } from "../../../core/indicator/indicator.model";
import { StochHaConfigComponent } from "./config/stoch-ha-config.component";
import { StochHaSignalsComponent } from "./signals/stoch-ha-signals.component";
import { BaseStrategyTypeComponent } from "../../../shared/components/strategy/base/base-strategy-type.component";

@Component({
  selector: 'app-stoch-ha',
  templateUrl: './stoch-ha.component.html',
  providers: [
    DatePipe
  ]
})
export class StochHaComponent extends BaseStrategyTypeComponent {

  drawStrategyResult() {
    this.drawHa();
    this.drawStochastic();
    super.drawSignals();
  }

  getDefaultConfig() {
    return {
      strategyConfiguration: {
        stochMovingAverageType: 'MODIFIED_MOVING_AVERAGE',
        stochFastPeriod: 5,
        stochSlowPeriod: 3,
        stochOversoldLevel: 30,
        stochOverboughtLevel: 70,
        positions: ['ENTRY_LONG', 'ENTRY_SHORT']
      },
      drawConfiguration: {
        stochDrawConfiguration: {
          fastStochasticColor: '#1c1afa',
          slowStochasticColor: '#fa0f16',
          oversold: 30,
          overbought: 70
        },
        haDrawConfiguration: {
          risingBarColor: '#3ba158',
          fallingBarColor: '#fa0f16'
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
    return StochHaConfigComponent;
  }

  getStrategySignalModal() {
    return StochHaSignalsComponent;
  }

  private drawHa() {
    this.indicatorDrawService.draw(this.buildHaConfig(), this.buildHaResults(), this.chart, this.container, 0, 400);
  }

  private buildHaConfig() {
    return new IndicatorSettings(new IndicatorItem('HA'), {}, this.configuration.drawConfiguration.haDrawConfiguration, false);
  }

  private buildHaResults() {
    const haResults = [];
    this.strategyResults.forEach(strategyResult => haResults.push(this.buildHaResult(strategyResult)));
    return haResults;
  }

  private buildHaResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      open: strategyResult.haOpen,
      high: strategyResult.haHigh,
      low: strategyResult.haLow,
      close: strategyResult.haClose,
    }
  }

  private drawStochastic() {
    this.indicatorDrawService.draw(this.buildStochasticConfig(), this.buildStochasticResults(), this.chart, this.container, 1);
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

}
