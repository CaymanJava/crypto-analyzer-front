import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IndicatorPickerComponent } from './indicator-picker/indicator-picker.component';
import { TieredMenuModule } from "primeng/primeng";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AccelerationDecelerationOscillatorComponent } from './indicator-config/ac/acceleration-deceleration-oscillator.component';
import { AverageDirectionalMovementIndexComponent } from './indicator-config/adx/average-directional-movement-index.component';
import { AlligatorComponent } from './indicator-config/alligator/alligator.component';
import { AwesomeOscillatorComponent } from './indicator-config/ao/awesome-oscillator.component';
import { AverageTrueRangeComponent } from './indicator-config/atr/average-true-range.component';
import { AroonComponent } from './indicator-config/aroon/aroon.component';
import { AccumulativeSwingIndexComponent } from './indicator-config/asi/accumulative-swing-index.component';
import { AverageTrueRangeBandsComponent } from './indicator-config/atrb/average-true-range-bands.component';
import { BollingerBandsComponent } from './indicator-config/bb/bollinger-bands.component';
import { CoppockCurveComponent } from './indicator-config/cc/coppock-curve.component';
import { CommodityChannelIndexComponent } from './indicator-config/cci/commodity-channel-index.component';
import { ChandelierExitComponent } from './indicator-config/ce/chandelier-exit.component';
import { ChandeForecastOscillatorComponent } from './indicator-config/cfo/chande-forecast-oscillator.component';
import { ChoppinessIndexComponent } from './indicator-config/chop/choppiness-index.component';
import { AccumulationDistributionLineComponent } from './indicator-config/adl/accumulation-distribution-line.component';
import { ColorPickerModule } from "ngx-color-picker";
import { AroonOscillatorComponent } from './indicator-config/aroon-osc/aroon-oscillator.component';
import { BollingerBandsWidthComponent } from './indicator-config/bbw/bollinger-bands-width.component';
import { SharedComponentsModule } from "../shared/components/shared-components.module";
import { BaseIndicatorComponent } from './indicator-config/base/base-indicator.component';
import { ChaikinMoneyFlowComponent } from './indicator-config/cmf/chaikin-money-flow.component';
import { ChandeMomentumOscillatorComponent } from './indicator-config/cmo/chande-momentum-oscillator.component';
import { ChaikinOscillatorComponent } from './indicator-config/co/chaikin-oscillator.component';
import { CenterOfGravityComponent } from './indicator-config/cog/center-of-gravity.component';
import { DonchianChannelComponent } from './indicator-config/dc/donchian-channel.component';
import { DisparityIndexComponent } from './indicator-config/di/disparity-index.component';
import { DetrendedPriceOscillatorComponent } from './indicator-config/dpo/detrended-price-oscillator.component';
import { ElderForceIndexComponent } from './indicator-config/efi/elder-force-index.component';
import { EhlersFisherTransformComponent } from './indicator-config/eft/ehlers-fisher-transform.component';
import { ElderImpulseSystemComponent } from './indicator-config/eis/elder-impulse-system.component';
import { MovingAverageEnvelopesComponent } from './indicator-config/env/moving-average-envelopes.component';
import { EaseOfMovementComponent } from './indicator-config/eom/ease-of-movement.component';
import { ElderRayIndexComponent } from './indicator-config/eri/elder-ray-index.component';
import { FractalComponent } from './indicator-config/fractal/fractal.component';
import { GopalakrishnanRangeIndexComponent } from './indicator-config/gapo/gopalakrishnan-range-index.component';
import { HeikenAshiComponent } from './indicator-config/ha/heiken-ashi.component';
import { HighLowBandsComponent } from './indicator-config/hlb/high-low-bands.component';
import { HistoricalVolatilityComponent } from './indicator-config/hv/historical-volatility.component';
import { IchimokuCloudsComponent } from './indicator-config/ic/ichimoku-clouds.component';
import { IntradayMovementIndexComponent } from './indicator-config/imi/intraday-movement-index.component';
import { KeltnerChannelComponent } from './indicator-config/kelt/keltner-channel.component';
import { KnowSureThingComponent } from './indicator-config/kst/know-sure-thing.component';
import { KlingerVolumeOscillatorComponent } from './indicator-config/kvo/klinger-volume-oscillator.component';
import { LinearRegressionComponent } from './indicator-config/lr/linear-regression.component';
import { MovingAverageComponent } from './indicator-config/ma/moving-average.component';
import { SharedDirectivesModule } from "../shared/directives/shared-directives.module";
import { MovingAverageConvergenceDivergenceComponent } from './indicator-config/macd/moving-average-convergence-divergence.component';
import { MarketFacilitationIndexComponent } from './indicator-config/mfi/market-facilitation-index.component';
import { MassIndexComponent } from './indicator-config/mi/mass-index.component';
import { OnBalanceVolumeComponent } from './indicator-config/obv/on-balance-volume.component';
import { PrettyGoodOscillatorComponent } from './indicator-config/pgo/pretty-good-oscillator.component';
import { PivotPointsComponent } from './indicator-config/pivot/pivot-points.component';
import { PriceMomentumOscillatorComponent } from './indicator-config/pmo/price-momentum-oscillator.component';
import { PercentagePriceOscillatorComponent } from './indicator-config/ppo/percentage-price-oscillator.component';
import { ParabolicStopAndReverseComponent } from './indicator-config/psar/parabolic-stop-and-reverse.component';
import { PriceVolumeTrendComponent } from './indicator-config/pvt/price-volume-trend.component';
import { QuickStickComponent } from './indicator-config/qs/quick-stick.component';
import { RainbowMovingAverageComponent } from './indicator-config/rma/rainbow-moving-average.component';
import { RainbowOscillatorComponent } from './indicator-config/ro/rainbow-oscillator.component';
import { RateOfChangeComponent } from './indicator-config/roc/rate-of-change.component';
import { RelativeStrengthIndexComponent } from './indicator-config/rsi/relative-strength-index.component';
import { ConnorsRelativeStrengthIndexComponent } from "./indicator-config/rsi/connors-relative-strength-index.component";
import { LaguerreRelativeStrengthIndexComponent } from "./indicator-config/rsi/laguerre-relative-strength-index.component";
import { StochasticRelativeStrengthIndexComponent } from "./indicator-config/rsi/stochastic-relative-strength-index.component";
import { RelativeVolatilityComponent } from './indicator-config/rv/relative-volatility.component';
import { RelativeVigorIndexComponent } from './indicator-config/rvi/relative-vigor-index.component';
import { RandomWalkIndexComponent } from './indicator-config/rwi/random-walk-index.component';
import { SwingIndexComponent } from './indicator-config/si/swing-index.component';
import { StochasticMomentumIndexComponent } from './indicator-config/smi/stochastic-momentum-index.component';
import { SuperTrendComponent } from './indicator-config/st/super-trend.component';
import { SchaffTrendCycleComponent } from './indicator-config/stc/schaff-trend-cycle.component';
import { StandardDeviationComponent } from './indicator-config/stdev/standard-deviation.component';
import { StochasticOscillatorComponent } from './indicator-config/stoch/stochastic-oscillator.component';
import { TwiggsMoneyFlowComponent } from './indicator-config/tmf/twiggs-money-flow.component';
import { TripleExponentialAverageComponent } from './indicator-config/trix/triple-exponential-average.component';
import { UltimateOscillatorComponent } from './indicator-config/uo/ultimate-oscillator.component';
import { VerticalHorizontalFilterComponent } from './indicator-config/vhf/vertical-horizontal-filter.component';
import { VolumeIndexComponent } from './indicator-config/vi/volume-index.component';
import { VolumeOscillatorComponent } from './indicator-config/vo/volume-oscillator.component';
import { WilliamsPercentRangeComponent } from './indicator-config/wpr/williams-percent-range.component';

const components = [
  IndicatorPickerComponent
];

const modalConfig = [
  BaseIndicatorComponent,
  AccelerationDecelerationOscillatorComponent,
  AccumulationDistributionLineComponent,
  AverageDirectionalMovementIndexComponent,
  AlligatorComponent,
  AwesomeOscillatorComponent,
  AverageTrueRangeComponent,
  AroonComponent,
  AroonOscillatorComponent,
  AccumulativeSwingIndexComponent,
  AverageTrueRangeBandsComponent,
  BollingerBandsComponent,
  BollingerBandsWidthComponent,
  CoppockCurveComponent,
  CommodityChannelIndexComponent,
  ChandelierExitComponent,
  ChandeForecastOscillatorComponent,
  ChoppinessIndexComponent,
  ChaikinMoneyFlowComponent,
  ChandeMomentumOscillatorComponent,
  ChaikinOscillatorComponent,
  CenterOfGravityComponent,
  DonchianChannelComponent,
  DisparityIndexComponent,
  DetrendedPriceOscillatorComponent,
  ElderForceIndexComponent,
  EhlersFisherTransformComponent,
  ElderImpulseSystemComponent,
  MovingAverageEnvelopesComponent,
  EaseOfMovementComponent,
  ElderRayIndexComponent,
  FractalComponent,
  GopalakrishnanRangeIndexComponent,
  HeikenAshiComponent,
  HighLowBandsComponent,
  HistoricalVolatilityComponent,
  IchimokuCloudsComponent,
  IntradayMovementIndexComponent,
  KeltnerChannelComponent,
  KnowSureThingComponent,
  KlingerVolumeOscillatorComponent,
  LinearRegressionComponent,
  MovingAverageComponent,
  MovingAverageConvergenceDivergenceComponent,
  MarketFacilitationIndexComponent,
  MassIndexComponent,
  OnBalanceVolumeComponent,
  PrettyGoodOscillatorComponent,
  PivotPointsComponent,
  PriceMomentumOscillatorComponent,
  PercentagePriceOscillatorComponent,
  ParabolicStopAndReverseComponent,
  PriceVolumeTrendComponent,
  QuickStickComponent,
  RainbowMovingAverageComponent,
  RainbowOscillatorComponent,
  RateOfChangeComponent,
  RelativeStrengthIndexComponent,
  ConnorsRelativeStrengthIndexComponent,
  LaguerreRelativeStrengthIndexComponent,
  StochasticRelativeStrengthIndexComponent,
  RelativeVolatilityComponent,
  RelativeVigorIndexComponent,
  RandomWalkIndexComponent,
  SwingIndexComponent,
  StochasticMomentumIndexComponent,
  SuperTrendComponent,
  SchaffTrendCycleComponent,
  StandardDeviationComponent,
  StochasticOscillatorComponent,
  TwiggsMoneyFlowComponent,
  TripleExponentialAverageComponent,
  UltimateOscillatorComponent,
  VerticalHorizontalFilterComponent,
  VolumeIndexComponent,
  VolumeOscillatorComponent,
  WilliamsPercentRangeComponent
];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    TieredMenuModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    SharedComponentsModule,
    SharedDirectivesModule
  ],
  declarations: [components, modalConfig],
  providers: [],
  entryComponents: [modalConfig],
  exports: [components]
})
export class IndicatorModule {
}
