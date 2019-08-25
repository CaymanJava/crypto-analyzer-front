import { Component } from '@angular/core';
import { BaseStrategyTypeComponent } from "../base-strategy-type.component";
import { DatePipe } from "@angular/common";
import { IndicatorItem, IndicatorSettings } from "../../../core/indicator/indicator.model";
import { Signal } from "../../../core/signal/signal.model";
import { LrsiMaPsarConfigComponent } from "./lrsi-ma-psar-config/lrsi-ma-psar-config.component";
import { LrsiMaPsarSignalsComponent } from "./lrsi-ma-psar-signals/lrsi-ma-psar-signals.component";

@Component({
  selector: 'app-lrsi-ma-psar',
  templateUrl: './lrsi-ma-psar.component.html',
  providers: [
    DatePipe
  ]
})
export class LrsiMaPsarComponent extends BaseStrategyTypeComponent {

  type = 'LRSI_MA_PSAR';

  drawStrategyResult() {
    this.drawLrsi();
    this.drawMa();
    this.drawPsar();
    this.drawSignals();
  }

  getDefaultConfig() {
    return {
      strategyConfiguration: {
        lrsiGamma: 0.5,
        lrsiOversoldLevel: 0.15,
        lrsiOverboughtLevel: 0.85,
        maType: 'EXPONENTIAL_MOVING_AVERAGE',
        maPriceType: 'CLOSE',
        maPeriod: 16,
        psarMinAccelerationFactor: 0.02,
        psarMaxAccelerationFactor: 0.2,
        positions: super.allPosition()
      },
      drawConfiguration: {
        lrsiDrawConfiguration: {
          indicatorLineColor: '#1c1afa',
          oversold: 0.15,
          overbought: 0.85
        },
        maDrawConfiguration: {
          indicatorLineColor: '#1c1afa'
        },
        psarDrawConfiguration: {
          indicatorColor: '#7e05a1',
          markerSize: 5,
          marker: 'star4'
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

  getStrategyConfigModel() {
    return LrsiMaPsarConfigComponent;
  }

  getStrategySignalModel() {
    return LrsiMaPsarSignalsComponent;
  }

  private drawLrsi() {
    this.indicatorDrawerService.draw(this.buildLrsiConfig(), this.buildLrsiResults(), this.chart, this.container, 0);
  }

  private buildLrsiConfig() {
    return new IndicatorSettings(new IndicatorItem('LRSI'), this.getLrsiConfig(), this.configuration.drawConfiguration.lrsiDrawConfiguration, false);
  }

  private getLrsiConfig() {
    return {
      gamma: this.configuration.strategyConfiguration.lrsiGamma
    }
  }

  private buildLrsiResults() {
    const lrsiResults = [];
    this.strategyResults.forEach(strategyResult => lrsiResults.push(this.buildLrsiResult(strategyResult)));
    return lrsiResults;
  }

  private buildLrsiResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      indicatorValue: strategyResult.lrsiValue
    }
  }

  private drawMa() {
    this.indicatorDrawerService.draw(this.buildMaConfig(), this.buildMaResults(), this.chart, this.container, 1);
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

  private drawPsar() {
    this.indicatorDrawerService.draw(this.buildPsarConfig(), this.buildPsarResults(), this.chart, this.container, 0);
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

  private buildPositions(strategyResult: any) {
    if (strategyResult.positions === null || strategyResult.positions.length === 0) {
      return new Set();
    }

    const positions = new Set<string>();
    strategyResult.positions.forEach(position => positions.add(position));

    return positions;
  }

}
