import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Strategy } from "./strategy.model";

@Injectable({
  providedIn: "root"
})
export class StrategyService {

  strategies = [
    {
      'name': 'Bill Williams Strategy',
      'type': 'BILL_WILLIAMS_STRATEGY',
      'description': 'Acceleration Deceleration Oscillator + Awesome Oscillator + Alligator + Fractals'
    },
    {
      'name': 'CCI + RSI + ATR',
      'type': 'CCI_RSI_ATR',
      'description': 'Commodity Channel Index + Relative Strength Index + Average True Range'
    },
    {
      'name': 'Double Parabolic Strategy',
      'type': 'DOUBLE_PARABOLIC',
      'description': 'Moving Average + Parabolic Stop And Reverse + Moving Average Convergence Divergence'
    },
    {
      'name': 'HA + MACD + PSAR',
      'type': 'HA_MACD_PSAR',
      'description': 'Heiken Ashi + Moving Average Convergence Divergence + Parabolic Stop And Reverse'
    },
    {
      'name': 'LRSI + MA + PSAR',
      'type': 'LRSI_MA_PSAR',
      'description': 'Laguerre Relative Strength Index + Moving Average + Parabolic Stop And Reverse'
    },
    {
      'name': 'MACD + CCI',
      'type': 'MACD_CCI',
      'description': 'Moving Average Convergence Divergence + Commodity Channel Index'
    },
    {
      'name': 'Pivot + RSI + MACD + MA',
      'type': 'PIVOT_RSI_MACD_MA',
      'description': 'Pivot + Relative Strength Index + Moving Average Convergence Divergence + Moving Average'
    },
    {
      'name': 'RSI + EIS + MA',
      'type': 'RSI_EIS_MA',
      'description': 'Relative Strength Index + Elder Impulse System + Moving Average'
    },
    {
      'name': 'STC + MA + MACD',
      'type': 'STC_MA_MACD',
      'description': 'Schaff Trend Cycle + Moving Average + Moving Average Convergence Divergence'
    },
    {
      'name': 'STOCH + AC + MA',
      'type': 'STOCH_AC_MA',
      'description': 'Acceleration Deceleration Oscillator + Stochastic Oscillator + Moving Average'
    },
    {
      'name': 'STOCH + ADX + MA',
      'type': 'STOCH_ADX_MA',
      'description': 'Stochastic Oscillator + Average Directional Movement Index + Moving Average'
    },
    {
      'name': 'STOCH + CCI',
      'type': 'STOCH_CCI',
      'description': 'Stochastic Oscillator + Commodity Channel Index'
    },
    {
      'name': 'STOCH + HA',
      'type': 'STOCH_HA',
      'description': 'Stochastic Oscillator + Heiken Ashi'
    },
  ];

  private strategyMap: Map<string, Strategy> = new Map();

  constructor() {
    this.initStrategyMap();
  }

  public getStrategies(): Observable<Strategy[]> {
    return new Observable(observer => observer.next(this.strategies));
  }

  public getStrategy(type: string) {
    return this.strategyMap.get(type);
  }

  private initStrategyMap() {
    this.strategies.forEach(strategy => this.strategyMap.set(strategy.type, strategy));
  }
}
