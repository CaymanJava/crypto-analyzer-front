import { Component } from '@angular/core';
import { DatePipe } from "@angular/common";
import { BaseStrategyTypeComponent } from "../base-strategy-type.component";
import { IndicatorItem, IndicatorSettings } from "../../../core/indicator/indicator.model";
import { Signal } from "../../../core/signal/signal.model";
import { HaMacdPsarConfigComponent } from "./config/ha-macd-psar-config.component";
import { HaMacdPsarSignalsComponent } from "./signals/ha-macd-psar-signals.component";

@Component({
  selector: 'app-ha-macd-psar',
  templateUrl: './ha-macd-psar.component.html',
  providers: [
    DatePipe
  ]
})
export class HaMacdPsarComponent extends BaseStrategyTypeComponent {

  type = 'HA_MACD_PSAR';

  drawStrategyResult() {
    this.drawHa();
    this.drawMacd();
    this.drawPsar();
    this.drawSignals();
  }

  getDefaultConfig() {
    return {
      strategyConfiguration: {
        macdMaType: 'EXPONENTIAL_MOVING_AVERAGE',
        macdPriceType: 'CLOSE',
        macdFastPeriod: 12,
        macdSlowPeriod: 26,
        macdSignalPeriod: 9,
        psarMinAccelerationFactor: 0.02,
        psarMaxAccelerationFactor: 0.2,
        positions: ['ENTRY_LONG', 'ENTRY_SHORT']
      },
      drawConfiguration: {
        haDrawConfiguration: {
          risingBarColor: '#3ba158',
          fallingBarColor: '#fa0f16'
        },
        macdDrawConfiguration: {
          indicatorLineColor: '#1c1afa',
          signalLineColor: '#fa0f16',
          barChartColor: '#4e4e76'
        },
        psarDrawConfiguration: {
          indicatorColor: '#7e05a1',
          markerSize: 5,
          marker: 'star4'
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
    return HaMacdPsarConfigComponent;
  }

  getStrategySignalModal() {
    return HaMacdPsarSignalsComponent;
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

  private drawPsar() {
    this.indicatorDrawService.draw(this.buildPsarConfig(), this.buildPsarResults(),
      this.chart, this.container, 1, null, 1);
  }

  private buildPsarConfig() {
    return new IndicatorSettings(new IndicatorItem('PSAR'), this.getPsarConfig(), this.configuration.drawConfiguration.psarDrawConfiguration, false);
  }

  private getPsarConfig() {
    return {
      minAccelerationFactor: this.configuration.strategyConfiguration.psarMinAccelerationFactor,
      maxAccelerationFactor: this.configuration.strategyConfiguration.psarMaxAccelerationFactor
    }
  }

  private buildPsarResults() {
    const psarResults = [];
    this.strategyResults.forEach(strategyResult => psarResults.push(this.buildPsarResult(strategyResult)));
    return psarResults;
  }

  private buildPsarResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      indicatorValue: strategyResult.psarValue
    }
  }

  private drawSignals() {
    this.signals = this.buildSignals();
    this.signalDrawService.draw(this.signals, this.configuration.drawConfiguration.signalConfiguration,
      this.chart, this.configuration.strategyConfiguration.positions);
  }

  private buildSignals() {
    const signalResults = [];
    this.strategyResults.forEach(strategyResult => signalResults.push(this.buildStrategyResult(strategyResult)));
    return signalResults;
  }

  private buildStrategyResult(strategyResult: any) {
    const signal = new Signal();
    signal.tick = strategyResult.tick;
    signal.positions = this.buildPositions(strategyResult);
    return signal;
  }

  private buildPositions(strategyResult: any): Set<string> {
    if (strategyResult.positions === null || strategyResult.positions.length === 0) {
      return new Set();
    }

    const positions = new Set<string>();
    strategyResult.positions.forEach(position => positions.add(position));

    return positions;
  }

}
