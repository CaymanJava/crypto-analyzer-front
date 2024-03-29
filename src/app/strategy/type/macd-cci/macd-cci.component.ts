import { Component } from '@angular/core';
import { DatePipe } from "@angular/common";
import { IndicatorItem, IndicatorSettings } from "../../../core/indicator/indicator.model";
import { MacdCciConfigComponent } from "./config/macd-cci-config.component";
import { MacdCciSignalsComponent } from "./signals/macd-cci-signals.component";
import { BaseStrategyTypeComponent } from "../../../shared/components/strategy/base/base-strategy-type.component";

@Component({
  selector: 'app-macd-cci',
  templateUrl: './macd-cci.component.html',
  providers: [
    DatePipe
  ]
})
export class MacdCciComponent extends BaseStrategyTypeComponent {

  drawStrategyResult() {
    this.drawMacd();
    this.drawCci();
    super.drawSignals();
  }

  getDefaultConfig() {
    return {
      strategyConfiguration: {
        macdMaType: 'EXPONENTIAL_MOVING_AVERAGE',
        macdPriceType: 'CLOSE',
        macdFastPeriod: 8,
        macdSlowPeriod: 17,
        macdSignalPeriod: 2,
        cciPeriod: 14,
        cciOversoldLevel: -100,
        cciOverboughtLevel: 100,
        positions: super.allPosition()
      },
      drawConfiguration: {
        macdDrawConfiguration: {
          indicatorLineColor: '#1c1afa',
          signalLineColor: '#fa0f16',
          barChartColor: '#4e4e76'
        },
        cciDrawConfiguration: {
          oversold: -100,
          overbought: 100,
          indicatorLineColor: '#0a2ecc'
        },
        signalConfiguration: {
          entryLongColor: '#3ba158',
          exitShortColor: '#4708fa',
          exitLongColor: '#fa0f16',
          entryShortColor: '#fa9a12',
          signalMarkerSize: 8,
          buyMarker: 'arrowUp',
          sellMarker: 'arrow-down'
        }
      }
    }
  }

  getStrategyConfigModal() {
    return MacdCciConfigComponent;
  }

  getStrategySignalModal() {
    return MacdCciSignalsComponent;
  }

  private drawMacd() {
    this.indicatorDrawService.draw(this.buildMacdConfig(), this.buildMacdResults(), this.chart, this.container, 0);
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
      indicatorValue: strategyResult.cciMacdValue
    }
  }

}
