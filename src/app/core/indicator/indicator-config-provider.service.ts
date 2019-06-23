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
import { DisparityIndexComponent } from "../../indicator/indicator-config/di/disparity-index.component";
import { DetrendedPriceOscillatorComponent } from "../../indicator/indicator-config/dpo/detrended-price-oscillator.component";
import { ElderForceIndexComponent } from "../../indicator/indicator-config/efi/elder-force-index.component";
import { EhlersFisherTransformComponent } from "../../indicator/indicator-config/eft/ehlers-fisher-transform.component";
import { ElderImpulseSystemComponent } from "../../indicator/indicator-config/eis/elder-impulse-system.component";
import { MovingAverageEnvelopesComponent } from "../../indicator/indicator-config/env/moving-average-envelopes.component";
import { EaseOfMovementComponent } from "../../indicator/indicator-config/eom/ease-of-movement.component";
import { ElderRayIndexComponent } from "../../indicator/indicator-config/eri/elder-ray-index.component";
import { FractalComponent } from "../../indicator/indicator-config/fractal/fractal.component";
import { GopalakrishnanRangeIndexComponent } from "../../indicator/indicator-config/gapo/gopalakrishnan-range-index.component";
import { HeikenAshiComponent } from "../../indicator/indicator-config/ha/heiken-ashi.component";
import { HighLowBandsComponent } from "../../indicator/indicator-config/hlb/high-low-bands.component";
import { HistoricalVolatilityComponent } from "../../indicator/indicator-config/hv/historical-volatility.component";
import { IchimokuCloudsComponent } from "../../indicator/indicator-config/ic/ichimoku-clouds.component";
import { IntradayMovementIndexComponent } from "../../indicator/indicator-config/imi/intraday-movement-index.component";
import { KeltnerChannelComponent } from "../../indicator/indicator-config/kelt/keltner-channel.component";
import { KnowSureThingComponent } from "../../indicator/indicator-config/kst/know-sure-thing.component";
import { KlingerVolumeOscillatorComponent } from "../../indicator/indicator-config/kvo/klinger-volume-oscillator.component";
import { LinearRegressionComponent } from "../../indicator/indicator-config/lr/linear-regression.component";
import { MovingAverageComponent } from "../../indicator/indicator-config/ma/moving-average.component";
import { MovingAverageConvergenceDivergenceComponent } from "../../indicator/indicator-config/macd/moving-average-convergence-divergence.component";
import { MarketFacilitationIndexComponent } from "../../indicator/indicator-config/mfi/market-facilitation-index.component";
import { MassIndexComponent } from "../../indicator/indicator-config/mi/mass-index.component";
import { OnBalanceVolumeComponent } from "../../indicator/indicator-config/obv/on-balance-volume.component";
import { PrettyGoodOscillatorComponent } from "../../indicator/indicator-config/pgo/pretty-good-oscillator.component";
import { Injectable } from "@angular/core";
import { PivotPointsComponent } from "../../indicator/indicator-config/pivot/pivot-points.component";
import { PriceMomentumOscillatorComponent } from "../../indicator/indicator-config/pmo/price-momentum-oscillator.component";
import { PercentagePriceOscillatorComponent } from "../../indicator/indicator-config/ppo/percentage-price-oscillator.component";
import { ParabolicStopAndReverseComponent } from "../../indicator/indicator-config/psar/parabolic-stop-and-reverse.component";
import { PriceVolumeTrendComponent } from "../../indicator/indicator-config/pvt/price-volume-trend.component";
import { QuickStickComponent } from "../../indicator/indicator-config/qs/quick-stick.component";
import { RainbowMovingAverageComponent } from "../../indicator/indicator-config/rma/rainbow-moving-average.component";
import { RainbowOscillatorComponent } from "../../indicator/indicator-config/ro/rainbow-oscillator.component";
import { RateOfChangeComponent } from "../../indicator/indicator-config/roc/rate-of-change.component";
import { RelativeStrengthIndexComponent } from "../../indicator/indicator-config/rsi/relative-strength-index.component";
import { ConnorsRelativeStrengthIndexComponent } from "../../indicator/indicator-config/rsi/connors-relative-strength-index.component";

@Injectable({
  providedIn: "root"
})
export class IndicatorConfigProviderService {

  getIndicatorConfigService(title: string) {
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
      case 'DI':
        return DisparityIndexComponent;
      case 'DPO':
        return DetrendedPriceOscillatorComponent;
      case 'EFI':
        return ElderForceIndexComponent;
      case 'EFT':
        return EhlersFisherTransformComponent;
      case 'EIS':
        return ElderImpulseSystemComponent;
      case 'ENV':
        return MovingAverageEnvelopesComponent;
      case 'EOM':
        return EaseOfMovementComponent;
      case 'ERI':
        return ElderRayIndexComponent;
      case 'FRACTAL':
        return FractalComponent;
      case 'GAPO':
        return GopalakrishnanRangeIndexComponent;
      case 'HA':
        return HeikenAshiComponent;
      case 'HLB':
        return HighLowBandsComponent;
      case 'HV':
        return HistoricalVolatilityComponent;
      case 'IC':
        return IchimokuCloudsComponent;
      case 'IMI':
        return IntradayMovementIndexComponent;
      case 'KELT':
        return KeltnerChannelComponent;
      case 'KST':
        return KnowSureThingComponent;
      case 'KVO':
        return KlingerVolumeOscillatorComponent;
      case 'LR':
        return LinearRegressionComponent;
      case 'MA':
        return MovingAverageComponent;
      case 'MACD':
        return MovingAverageConvergenceDivergenceComponent;
      case 'MFI':
        return MarketFacilitationIndexComponent;
      case 'MI':
        return MassIndexComponent;
      case 'OBV':
        return OnBalanceVolumeComponent;
      case 'PGO':
        return PrettyGoodOscillatorComponent;
      case 'PIVOT':
        return PivotPointsComponent;
      case 'PMO':
        return PriceMomentumOscillatorComponent;
      case 'PPO':
        return PercentagePriceOscillatorComponent;
      case 'PSAR':
        return ParabolicStopAndReverseComponent;
      case 'PVT':
        return PriceVolumeTrendComponent;
      case 'QS':
        return QuickStickComponent;
      case 'RMA':
        return RainbowMovingAverageComponent;
      case 'RO':
        return RainbowOscillatorComponent;
      case 'ROC':
        return RateOfChangeComponent;
      case 'RSI':
        return RelativeStrengthIndexComponent;
      case 'CRSI':
        return ConnorsRelativeStrengthIndexComponent;
    }
  }

}
