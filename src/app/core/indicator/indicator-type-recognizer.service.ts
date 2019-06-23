import { Injectable } from "@angular/core";
import { IndicatorSettings } from "./indicator.model";

@Injectable({
  providedIn: "root"
})
export class IndicatorTypeRecognizerService {

  recognize(settings: IndicatorSettings): string {
    switch (settings.indicatorItem.title) {
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
      case 'DI':
        return 'DISPARITY_INDEX';
      case 'DPO':
        return 'DETRENDED_PRICE_OSCILLATOR';
      case 'EFI':
        return 'ELDERS_FORCE_INDEX';
      case 'EFT':
        return 'EHLERS_FISHER_TRANSFORM';
      case 'EIS':
        return 'ELDER_IMPULSE_SYSTEM';
      case 'ENV':
        return 'MOVING_AVERAGE_ENVELOPES';
      case 'EOM':
        return 'EASE_OF_MOVEMENT';
      case 'ERI':
        return 'ELDER_RAY_INDEX';
      case 'FRACTAL':
        return 'FRACTAL';
      case 'GAPO':
        return 'GOPALAKRISHNAN_RANGE_INDEX';
      case 'HA':
        return 'HEIKEN_ASHI';
      case 'HLB':
        return 'HIGH_LOW_BANDS';
      case 'HV':
        return 'HISTORICAL_VOLATILITY';
      case 'IC':
        return 'ICHIMOKU_CLOUDS';
      case 'IMI':
        return 'INTRADAY_MOMENTUM_INDEX';
      case 'KELT':
        return 'KELTNER_CHANNEL';
      case 'KST':
        return 'KNOW_SURE_THING';
      case 'KVO':
        return 'KLINGER_VOLUME_OSCILLATOR';
      case 'LR':
        return 'LINEAR_REGRESSION';
      case 'MA':
        return settings.configuration.indicatorType;
      case 'MACD':
        return 'MOVING_AVERAGE_CONVERGENCE_DIVERGENCE';
      case 'MFI':
        return 'MARKET_FACILITATION_INDEX';
      case 'MI':
        return 'MASS_INDEX';
      case 'OBV':
        return 'ON_BALANCE_VOLUME';
      case 'PGO':
        return 'PRETTY_GOOD_OSCILLATOR';
      case 'PIVOT':
        return settings.configuration.indicatorType;
      case 'PMO':
        return 'PRICE_MOMENTUM_OSCILLATOR';
      case 'PPO':
        return 'PERCENTAGE_PRICE_OSCILLATOR';
      case 'PSAR':
        return 'PARABOLIC_STOP_AND_REVERSE';
      case 'PVT':
        return 'PRICE_VOLUME_TREND';
      case 'QS':
        return 'QUICK_STICK';
      case 'RMA':
        return 'RAINBOW_MOVING_AVERAGE';
    }
  }

}
