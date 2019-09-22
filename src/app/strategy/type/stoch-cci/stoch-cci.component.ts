import { Component } from '@angular/core';
import { BaseStrategyTypeComponent } from "../base-strategy-type.component";
import { DatePipe } from "@angular/common";
import { IndicatorItem, IndicatorSettings } from "../../../core/indicator/indicator.model";
import { StochCciConfigComponent } from "./config/stoch-cci-config.component";
import { StochCciSignalsComponent } from "./signals/stoch-cci-signals.component";

@Component({
  selector: 'app-stoch-cci',
  templateUrl: './stoch-cci.component.html',
  providers: [
    DatePipe
  ]
})
export class StochCciComponent extends BaseStrategyTypeComponent {

  type = 'STOCH_CCI';

  drawStrategyResult() {
    this.drawStochastic();
    this.drawCci();
    super.drawSignals();
  }

  getDefaultConfig() {
    return {
      strategyConfiguration: {
        stochMovingAverageType: 'SIMPLE_MOVING_AVERAGE',
        stochFastPeriod: 20,
        stochSlowPeriod: 3,
        stochOversoldLevel: 20,
        stochOverboughtLevel: 80,
        cciPeriod: 20,
        cciOversoldLevel: -100,
        cciOverboughtLevel: 100,
        positions: ['ENTRY_LONG', 'ENTRY_SHORT']
      },
      drawConfiguration: {
        stochDrawConfiguration: {
          fastStochasticColor: '#1c1afa',
          slowStochasticColor: '#fa0f16',
          oversold: 20,
          overbought: 80
        },
        cciDrawConfiguration: {
          indicatorLineColor: '#1c1afa',
          oversold: -100,
          overbought: 100
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
    return StochCciConfigComponent;
  }

  getStrategySignalModal() {
    return StochCciSignalsComponent;
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

  private drawCci() {
    this.indicatorDrawService.draw(this.buildCciConfig(), this.buildCciResults(), this.chart, this.container, 1);
  }

  private buildCciConfig() {
    return new IndicatorSettings(new IndicatorItem('CCI'), this.getCciConfig(), this.configuration.drawConfiguration.cciDrawConfiguration, false);
  }

  private getCciConfig() {
    return {
      period: this.configuration.strategyConfiguration.cciPeriod
    }
  }

  private buildCciResults() {
    const cciResults = [];
    this.strategyResults.forEach(strategyResult => cciResults.push(this.buildCciResult(strategyResult)));
    return cciResults;
  }

  private buildCciResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      indicatorValue: strategyResult.cciResultValue
    }
  }

}
