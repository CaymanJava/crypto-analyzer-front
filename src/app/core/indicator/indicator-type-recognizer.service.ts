import { Injectable } from "@angular/core";

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
    }
  }

}
