import { Component } from '@angular/core';
import { IndicatorItem, IndicatorSettings } from "../../../core/indicator/indicator.model";
import { BwsConfigComponent } from "./config/bws-config.component";
import { BwsSignalsComponent } from "./signals/bws-signals.component";
import { DatePipe } from "@angular/common";
import { BaseStrategyTypeComponent } from "../../../shared/components/strategy/base/base-strategy-type.component";

@Component({
  selector: 'app-bill-williams-strategy',
  templateUrl: './bill-williams-strategy.component.html',
  providers: [
    DatePipe
  ]
})
export class BillWilliamsStrategyComponent extends BaseStrategyTypeComponent {

  drawStrategyResult() {
    this.drawAc();
    this.drawAo();
    this.drawAlligator();
    this.drawFractal();
    super.drawSignals();
  }

  getDefaultConfig() {
    return {
      strategyConfiguration: {
        acFastPeriod: 5,
        acSlowPeriod: 34,
        acSmoothedPeriod: 5,
        alligatorJawPeriod: 13,
        alligatorJawOffset: 8,
        alligatorTeethPeriod: 8,
        alligatorTeethOffset: 5,
        alligatorLipsPeriod: 5,
        alligatorLipsOffset: 3,
        aoFastPeriod: 6,
        aoSlowPeriod: 34,
        positions: super.allPosition()
      },
      drawConfiguration: {
        alligatorConfiguration: {
          jawLineColor: '#1c1afa',
          teethLineColor: '#fa0f16',
          lipsLineColor: '#3ba158'
        },
        fractalConfiguration: {
          upFractalColor: '#3ba158',
          downFractalColor: '#fa0f16',
          markerSize: 5,
          marker: 'trapezium'
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
    };
  }

  getStrategyConfigModal() {
    return BwsConfigComponent;
  }

  getStrategySignalModal() {
    return BwsSignalsComponent;
  }

  private drawAc() {
    this.indicatorDrawService.draw(this.buildAcConfig(), this.buildAcResults(), this.chart, this.container, 1);
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

  private drawAo() {
    this.indicatorDrawService.draw(this.buildAoConfig(), this.buildAoResults(), this.chart, this.container, 2);
  }

  private buildAoConfig() {
    return new IndicatorSettings(new IndicatorItem('AO'), this.getAoConfig(), {}, false);
  }

  private getAoConfig() {
    return {
      slowPeriod: this.configuration.strategyConfiguration.aoSlowPeriod,
      fastPeriod: this.configuration.strategyConfiguration.aoFastPeriod
    }
  }

  private buildAoResults() {
    const aoResults = [];
    this.strategyResults.forEach(strategyResult => aoResults.push(this.buildAoResult(strategyResult)));
    return aoResults;
  }

  private buildAoResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      indicatorValue: strategyResult.aoValue,
      increased: strategyResult.aoIncreased
    }
  }

  private drawAlligator() {
    this.indicatorDrawService.draw(this.buildAlligatorConfig(), this.buildAlligatorResults(), this.chart, this.container, 0);
  }

  private buildAlligatorConfig() {
    return new IndicatorSettings(new IndicatorItem('ALLIGATOR'), this.getAlligatorConfig(),
      this.configuration.drawConfiguration.alligatorConfiguration, false);
  }

  private getAlligatorConfig() {
    return {
      jawPeriod: this.configuration.strategyConfiguration.alligatorJawPeriod,
      jawOffset: this.configuration.strategyConfiguration.alligatorJawOffset,
      teethPeriod: this.configuration.strategyConfiguration.alligatorTeethPeriod,
      teethOffset: this.configuration.strategyConfiguration.alligatorTeethOffset,
      lipsPeriod: this.configuration.strategyConfiguration.alligatorLipsPeriod,
      lipsOffset: this.configuration.strategyConfiguration.alligatorLipsOffset
    };
  }

  private buildAlligatorResults() {
    const alligatorResults = [];
    this.strategyResults.forEach(strategyResult => alligatorResults.push(this.buildAlligatorResult(strategyResult)));
    return alligatorResults;
  }

  private buildAlligatorResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      jawValue: strategyResult.jawValue,
      teethValue: strategyResult.teethValue,
      lipsValue: strategyResult.lipsValue
    }
  }

  private drawFractal() {
    this.indicatorDrawService.draw(this.buildFractalConfig(), this.buildFractalResults(), this.chart, this.container, 0);
  }

  private buildFractalConfig() {
    return new IndicatorSettings(new IndicatorItem('FRACTAL'), {},
      this.configuration.drawConfiguration.fractalConfiguration, false);
  }

  private buildFractalResults() {
    const fractalResults = [];
    this.strategyResults.forEach(strategyResult => fractalResults.push(this.buildFractalResult(strategyResult)));
    return fractalResults;
  }

  private buildFractalResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      upFractal: strategyResult.upFractal,
      downFractal: strategyResult.downFractal,
      high: strategyResult.tick.high,
      low: strategyResult.tick.low
    }
  }

}
