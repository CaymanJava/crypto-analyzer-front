import { Injectable } from "@angular/core";
import { AccelerationDecelerationOscillatorComponent } from "../../indicator/indicator-config/ac/acceleration-deceleration-oscillator.component";
import { AccumulationDistributionLineComponent } from "../../indicator/indicator-config/adl/accumulation-distribution-line.component";
import { AverageDirectionalMovementIndexComponent } from "../../indicator/indicator-config/adx/average-directional-movement-index.component";
import { AlligatorComponent } from "../../indicator/indicator-config/alligator/alligator.component";
import { AwesomeOscillatorComponent } from "../../indicator/indicator-config/ao/awesome-oscillator.component";
import { AroonComponent } from "../../indicator/indicator-config/aroon/aroon.component";
import { AroonOscillatorComponent } from "../../indicator/indicator-config/aroon-osc/aroon-oscillator.component";
import { AccumulativeSwingIndexComponent } from "../../indicator/indicator-config/asi/accumulative-swing-index.component";
import { AverageTrueRangeComponent } from "../../indicator/indicator-config/atr/average-true-range.component";
import { AverageTrueRangeBandsComponent } from "../../indicator/indicator-config/atrb/average-true-range-bands.component";
import { BollingerBandsComponent } from "../../indicator/indicator-config/bb/bollinger-bands.component";
import { BollingerBandsWidthComponent } from "../../indicator/indicator-config/bbw/bollinger-bands-width.component";
import { CoppockCurveComponent } from "../../indicator/indicator-config/cc/coppock-curve.component";
import { CommodityChannelIndexComponent } from "../../indicator/indicator-config/cci/commodity-channel-index.component";
import { ChandelierExitComponent } from "../../indicator/indicator-config/ce/chandelier-exit.component";
import { ChandeForecastOscillatorComponent } from "../../indicator/indicator-config/cfo/chande-forecast-oscillator.component";
import { ChoppinessIndexComponent } from "../../indicator/indicator-config/chop/choppiness-index.component";
import { ChaikinMoneyFlowComponent } from "../../indicator/indicator-config/cmf/chaikin-money-flow.component";
import { ChandeMomentumOscillatorComponent } from "../../indicator/indicator-config/cmo/chande-momentum-oscillator.component";
import { ChaikinOscillatorComponent } from "../../indicator/indicator-config/co/chaikin-oscillator.component";
import { CenterOfGravityComponent } from "../../indicator/indicator-config/cog/center-of-gravity.component";
import { DonchianChannelComponent } from "../../indicator/indicator-config/dc/donchian-channel.component";

@Injectable()
export class IndicatorTypeRecognizerService {

  recognize(title: string): string {
    switch (title) {
      case 'AC':
        return 'ACCELERATION_DECELERATION_OSCILLATOR';
      case 'ADL':
        return 'ACCUMULATION_DISTRIBUTION_LINE';
      case 'ADX':
        return 'AVERAGE_DIRECTIONAL_MOVEMENT_INDEX';
      case 'ALLIGATOR':
        return 'ALLIGATOR';
      case 'AO':
        return 'AWESOME_OSCILLATOR';
      case 'AROON':
      case 'AROON OSC':
        return 'AROON_UP_DOWN';
      case 'ASI':
        return 'ACCUMULATIVE_SWING_INDEX';
      case 'ATR':
        return 'AVERAGE_TRUE_RANGE';
      case 'ATRB':
        return 'AVERAGE_TRUE_RANGE_BANDS';
      case 'BB':
        return 'BOLLINGER_BANDS';
      case 'BBW':
        return 'BOLLINGER_BANDS_WIDTH';
      case 'CC':
        return 'COPPOCK_CURVE';
      case 'CCI':
        return 'COMMODITY_CHANNEL_INDEX';
      case 'CE':
        return 'CHANDELIER_EXIT';
      case 'CFO':
        return 'CHANDE_FORECAST_OSCILLATOR';
      case 'CHOP':
        return 'CHOPPINESS_INDEX';
      case 'CMF':
        return 'CHAIKIN_MONEY_FLOW';
      case 'CMO':
        return 'CHANDE_MOMENTUM_OSCILLATOR';
      case 'CO':
        return 'CHAIKIN_OSCILLATOR';
      case 'COG':
        return 'CENTER_OF_GRAVITY';
      case 'DC':
        return 'DONCHIAN_CHANNEL';
    }
  }

  recognizeModal(title: string) {
    switch (title) {
      case 'AC':
        return AccelerationDecelerationOscillatorComponent;
      case 'ADL':
        return AccumulationDistributionLineComponent;
      case 'ADX':
        return AverageDirectionalMovementIndexComponent;
      case 'ALLIGATOR':
        return AlligatorComponent;
      case 'AO':
        return AwesomeOscillatorComponent;
      case 'AROON':
        return AroonComponent;
      case 'AROON OSC':
        return AroonOscillatorComponent;
      case 'ASI':
        return AccumulativeSwingIndexComponent;
      case 'ATR':
        return AverageTrueRangeComponent;
      case 'ATRB':
        return AverageTrueRangeBandsComponent;
      case 'BB':
        return BollingerBandsComponent;
      case 'BBW':
        return BollingerBandsWidthComponent;
      case 'CC':
        return CoppockCurveComponent;
      case 'CCI':
        return CommodityChannelIndexComponent;
      case 'CE':
        return ChandelierExitComponent;
      case 'CFO':
        return ChandeForecastOscillatorComponent;
      case 'CHOP':
        return ChoppinessIndexComponent;
      case 'CMF':
        return ChaikinMoneyFlowComponent;
      case 'CMO':
        return ChandeMomentumOscillatorComponent;
      case 'CO':
        return ChaikinOscillatorComponent;
      case 'COG':
        return CenterOfGravityComponent;
      case 'DC':
        return DonchianChannelComponent;
    }
  }

}
