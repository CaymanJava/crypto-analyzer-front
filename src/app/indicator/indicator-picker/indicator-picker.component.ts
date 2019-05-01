import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from "primeng/api";
import { IndicatorItem } from "../../core/indicator/indicator.model";

@Component({
  selector: 'app-indicator-picker',
  templateUrl: './indicator-picker.component.html',
  styleUrls: ['./indicator-picker.component.scss']
})
export class IndicatorPickerComponent implements OnInit {

  items: MenuItem[];

  @Output() onIndicatorSelect: EventEmitter<IndicatorItem> = new EventEmitter();
  @Output() clearAll: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.loadIndicator();
  }

  loadIndicator() {
    this.items = [
      this.clearItem(),
      this.separator(),
      this.indicatorItem('Acceleration Deceleration Oscillator', 'AC'),
      this.indicatorItem('Accumulation Distribution Line', 'ADL'),
      this.indicatorItem('Average Directional Movement Index', 'ADX'),
      this.indicatorItem('Alligator', 'ALLIGATOR'),
      this.indicatorItem('Awesome Oscillator', 'AO'),
      this.indicatorItem('Aroon Up Down', 'AROON'),
      this.indicatorItem('Aroon Oscillator', 'AROON OSC'),
      this.indicatorItem('Accumulative Swing Index', 'ASI'),
      this.indicatorItem('Average True Range', 'ATR'),
      this.indicatorItem('Average True Range Bands', 'ATRB'),
      this.indicatorItem('Bollinger Bands', 'BB'),
      this.indicatorItem('Bollinger Bands Width', 'BBW'),
      this.indicatorItem('Coppock Curve', 'CC'),
      this.indicatorItem('Commodity Channel Index', 'CCI'),
      this.indicatorItem('Chandelier Exit', 'CE'),
      this.indicatorItem('Chande Forecast Oscillator', 'CFO'),
      this.indicatorItem('Choppiness Index', 'CI'),
      this.indicatorItem('Chaikin Money Flow', 'CMF'),
      this.indicatorItem('Chaikin Money Flow', 'CMF'),
      this.indicatorItem('Chande Momentum Oscillator', 'CMO'),
      this.indicatorItem('Chaikin Oscillator', 'CO'),
      this.indicatorItem('Center Of Gravity', 'COG'),
      this.indicatorItem('Donchian Channel', 'DC'),
      this.indicatorItem('Disparity Index', 'DI'),
      this.indicatorItem('Detrended Price Oscillator', 'DPO'),
      this.indicatorItem('Elder Force Index', 'EFI'),
      this.indicatorItem('Ehlers Fisher Transform', 'EFT'),
      this.indicatorItem('Elder Impulse System', 'EIS'),
      this.indicatorItem('Moving Average Envelopes', 'ENV'),
      this.indicatorItem('Ease Of Movement', 'EOM'),
      this.indicatorItem('Elder Ray Index', 'ERI'),
      this.indicatorItem('Fractal', 'FRACTAL'),
      this.indicatorItem('Gopalakrishnan Range Index', 'GAPO'),
      this.indicatorItem('Heiken Ashi', 'HA'),
      this.indicatorItem('High Low Bands', 'HLB'),
      this.indicatorItem('Historical Volatility', 'HV'),
      this.indicatorItem('Ichimoku Clouds', 'IC'),
      this.indicatorItem('Intraday Momentum Index', 'IMI'),
      this.indicatorItem('Keltner Channel', 'KELT'),
      this.indicatorItem('Know Sure Thing', 'KST'),
      this.indicatorItem('Klinger Volume Oscillator', 'KVO'),
      this.indicatorItem('Linear Regression', 'LR'),
      this.indicatorItem('Moving Average', 'MA'),
      this.indicatorItem('Moving Average Convergence Divergence', 'MACD'),
      this.indicatorItem('Market Facilitation Index', 'MFI'),
      this.indicatorItem('Mass Index', 'MI'),
      this.indicatorItem('On Balance Volume', 'OBV'),
      this.indicatorItem('Pretty Good Oscillator', 'PGO'),
      this.indicatorItem('Pivot Points', 'PIVOT'),
      this.indicatorItem('Price Momentum Oscillator', 'PMO'),
      this.indicatorItem('Percentage Price Oscillator', 'PPO'),
      this.indicatorItem('Parabolic Stop And Reverse', 'PSAR'),
      this.indicatorItem('Price Volume Trend', 'PVT'),
      this.indicatorItem('Quick Stick', 'QS'),
      this.indicatorItem('Rainbow Moving Average', 'RMA'),
      this.indicatorItem('Rainbow Oscillator', 'RO'),
      this.indicatorItem('Rate Of Change', 'ROC'),
      this.indicatorItem('Relative Strength Index', 'RSI'),
      this.indicatorItem('Connors Relative Strength Index', 'CRSI'),
      this.indicatorItem('Laguerre Relative Strength Index', 'LRSI'),
      this.indicatorItem('Stochastic Relative Strength Index', 'SRSI'),
      this.indicatorItem('Relative Volatility', 'RV'),
      this.indicatorItem('Relative Vigor Index', 'RVI'),
      this.indicatorItem('Random Walk Index', 'RWI'),
      this.indicatorItem('Swing Index', 'SI'),
      this.indicatorItem('Stochastic Momentum Index', 'SMI'),
      this.indicatorItem('Super Trend', 'ST'),
      this.indicatorItem('Schaff Trend Cycle', 'STC'),
      this.indicatorItem('Standard Deviation', 'STDEV'),
      this.indicatorItem('Stochastic Oscillator', 'STOCH'),
      this.indicatorItem('Preferable Stochastic Oscillator', 'PSTOCH'),
      this.indicatorItem('Twiggs Money Flow', 'TMF'),
      this.indicatorItem('Triple Exponential Average', 'TRIX'),
      this.indicatorItem('Ultimate Oscillator', 'UO'),
      this.indicatorItem('Vertical Horizontal Filter', 'VHF'),
      this.indicatorItem('Volume Index', 'VI'),
      this.indicatorItem('Volume Oscillator', 'VO'),
      this.indicatorItem('Williams Percent Range', 'WPR')
    ];
  }

  private separator() {
    return {separator: true};
  }

  private clearItem() {
    return {
      label: 'Clear All',
      icon: 'pi pi-fw pi-times',
      command: () => this.cleanIndicators()
    };
  }

  private indicatorItem(label: string, title: string) {
    return {
      label: label,
      title: title,
      command: (event) => this.selectIndicator(event)
    };
  }

  selectIndicator(event) {
    this.onIndicatorSelect.emit(event.item);
  }

  cleanIndicators() {
    this.clearAll.emit();
  }

}
