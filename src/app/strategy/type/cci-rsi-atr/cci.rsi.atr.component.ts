import { Component } from '@angular/core';
import { BaseStrategyTypeComponent } from "../base-strategy-type.component";
import { IndicatorItem, IndicatorSettings } from "../../../core/indicator/indicator.model";
import { DatePipe } from "@angular/common";
import { Signal } from "../../../core/signal/signal.model";
import { CciRsiAtrConfigComponent } from "./cci-rsi-atr-config/cci-rsi-atr-config.component";
import { CciRsiAtrSignalsComponent } from "./cci-rsi-atr-signals/cci-rsi-atr-signals.component";

@Component({
  selector: 'app-cci-rsi-atr',
  templateUrl: './cci-rsi-atr.component.html',
  providers: [
    DatePipe
  ]
})
export class CciRsiAtrComponent extends BaseStrategyTypeComponent {

  type = 'CCI_RSI_ATR';

  drawStrategyResult() {
    this.drawCci();
    this.drawRsi();
    this.drawAtr();
    this.drawSignals();
  }

  getDefaultConfig() {
    return {
      strategyConfiguration: {
        cciPeriod: 34,
        cciSignalLine: 0,
        rsiMaType: 'SMOOTHED_MOVING_AVERAGE',
        rsiPeriod: 10,
        rsiSignalLine: 50,
        atrPeriod: 14,
        atrMaType: 'SIMPLE_MOVING_AVERAGE',
        atrMaPeriod: 5,
        positions: ['ENTRY_LONG', 'ENTRY_SHORT']
      },
      drawConfiguration: {
        cciDrawConfiguration: {
          overbought: 100,
          oversold: -100,
          indicatorLineColor: '#0a2ecc'
        },
        rsiDrawConfiguration: {
          overbought: 80,
          oversold: 20,
          indicatorLineColor: '#1c1afa'
        },
        atrDrawConfiguration: {
          indicatorLineColor: '#1c1afa',
          signalLineColor: '#fa0f16'
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
    return CciRsiAtrConfigComponent;
  }

  getStrategySignalModal() {
    return CciRsiAtrSignalsComponent;
  }

  private drawCci() {
    this.indicatorDrawerService.draw(this.buildCciConfig(), this.buildCciResults(), this.chart, this.container, 1);
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
      indicatorValue: strategyResult.cciValue
    }
  }

  private drawRsi() {
    this.indicatorDrawerService.draw(this.buildRsiConfig(), this.buildRsiResults(), this.chart, this.container, 2);
  }

  private buildRsiConfig() {
    return new IndicatorSettings(new IndicatorItem('RSI'), this.getRsiConfig(), this.configuration.drawConfiguration.rsiDrawConfiguration, false);
  }

  private getRsiConfig() {
    return {
      movingAverageType: this.configuration.strategyConfiguration.rsiMaType,
      period: this.configuration.strategyConfiguration.rsiPeriod
    }
  }

  private buildRsiResults() {
    const rsiResults = [];
    this.strategyResults.forEach(strategyResult => rsiResults.push(this.buildRsiResult(strategyResult)));
    return rsiResults;
  }

  private buildRsiResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      indicatorValue: strategyResult.rsiValue
    }
  }

  private drawAtr() {
    this.indicatorDrawerService.draw(this.buildAtrConfig(), this.buildAtrResults(), this.chart, this.container, 3);
  }

  private buildAtrConfig() {
    return new IndicatorSettings(new IndicatorItem('ATR'), this.getAtrConfig(), this.configuration.drawConfiguration.atrDrawConfiguration, false);
  }

  private getAtrConfig() {
    return {
      period: this.configuration.strategyConfiguration.atrPeriod,
      movingAverageType: this.configuration.strategyConfiguration.atrMaType,
      movingAveragePeriod: this.configuration.strategyConfiguration.atrMaPeriod
    }
  }

  private buildAtrResults() {
    const atrResults = [];
    this.strategyResults.forEach(strategyResult => atrResults.push(this.buildAtrResult(strategyResult)));
    return atrResults;
  }

  private buildAtrResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      indicatorValue: strategyResult.atrValue,
      signalLineValue: strategyResult.atrSignalLineValue,
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
    signal.stopLose = strategyResult.stopLose;
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
