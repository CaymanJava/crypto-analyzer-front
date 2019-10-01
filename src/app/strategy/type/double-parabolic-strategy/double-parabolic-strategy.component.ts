import { Component } from '@angular/core';
import { DatePipe } from "@angular/common";
import { IndicatorItem, IndicatorSettings } from "../../../core/indicator/indicator.model";
import { DpsarConfigComponent } from "./config/dpsar-config.component";
import { DpsarSignalsComponent } from "./signals/dpsar-signals.component";
import { BaseStrategyTypeComponent } from "../../../shared/components/strategy/base/base-strategy-type.component";

@Component({
  selector: 'app-double-parabolic-strategy',
  templateUrl: './double-parabolic-strategy.component.html',
  providers: [
    DatePipe
  ]
})
export class DoubleParabolicStrategyComponent extends BaseStrategyTypeComponent {

  drawStrategyResult() {
    this.drawMa();
    this.drawMacd();
    this.drawPsar();
    this.drawPsarMacd();
    super.drawSignals();
  }

  getDefaultConfig() {
    return {
      strategyConfiguration: {
        movingAveragePeriod: 14,
        movingAveragePriceType: 'CLOSE',
        movingAverageType: 'EXPONENTIAL_MOVING_AVERAGE',
        macdMovingAverageType: 'EXPONENTIAL_MOVING_AVERAGE',
        macdPriceType: 'CLOSE',
        macdFastPeriod: 5,
        macdSlowPeriod: 8,
        macdSignalPeriod: 9,
        psarMinAccelerationFactor: 0.01,
        psarMaxAccelerationFactor: 0.11,
        pswMinAccelerationFactor: 0.01,
        pswMaxAccelerationFactor: 0.11,
        positions: ['ENTRY_LONG', 'ENTRY_SHORT']
      },
      drawConfiguration: {
        maDrawConfiguration: {
          indicatorLineColor: '#1c1afa'
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
        pswDrawConfiguration: {
          macdLineColor: '#fa0f16',
          indicatorColor: '#6732a1',
          markerSize: 3,
          marker: 'star6'
        },
        signalConfiguration: {
          entryLongColor: '#3ba158',
          entryShortColor: '#fa9a12',
          signalMarkerSize: 8,
          buyMarker: 'arrowUp',
          sellMarker: 'arrow-down'
        }
      }
    };
  }

  getStrategyConfigModal() {
    return DpsarConfigComponent;
  }

  getStrategySignalModal() {
    return DpsarSignalsComponent;
  }

  private drawMa() {
    this.indicatorDrawService.draw(this.buildMaConfig(), this.buildMaResults(), this.chart, this.container, 0);
  }

  private buildMaConfig() {
    return new IndicatorSettings(new IndicatorItem('MA'), this.getMaConfig(), this.configuration.drawConfiguration.maDrawConfiguration, false);
  }

  private getMaConfig() {
    return {
      indicatorType: this.configuration.strategyConfiguration.movingAverageType,
      priceType: this.configuration.strategyConfiguration.movingAveragePriceType,
      period: this.configuration.strategyConfiguration.movingAveragePeriod
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
    this.indicatorDrawService.draw(this.buildPsarConfig(), this.buildPsarResults(), this.chart, this.container, 0);
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

  private drawPsarMacd() {
    this.indicatorDrawService.draw(this.buildPsarMacdConfig(), this.buildPsarMacdResults(), this.chart, this.container, 2);
  }

  private buildPsarMacdConfig() {
    return new IndicatorSettings(new IndicatorItem('PSAR-MACD'), this.getPsarMacdConfig(), this.configuration.drawConfiguration.pswDrawConfiguration, false);
  }

  private getPsarMacdConfig() {
    return {
      signalPeriod: this.configuration.strategyConfiguration.macdSignalPeriod,
      minAccelerationFactor: this.configuration.strategyConfiguration.pswMinAccelerationFactor,
      maxAccelerationFactor: this.configuration.strategyConfiguration.pswMaxAccelerationFactor
    }
  }

  private buildPsarMacdResults() {
    const psarMacdResults = [];
    this.strategyResults.forEach(strategyResult => psarMacdResults.push(this.buildPsarMacdResult(strategyResult)));
    return psarMacdResults;
  }

  private buildPsarMacdResult(strategyResult: any) {
    return {
      time: strategyResult.tick.tickTime,
      indicatorValue: strategyResult.pswValue,
      signalLineValue: strategyResult.macdSignalLineValue
    }
  }

}
