export class Strategy {
  name: string;
  type: string;
  description: string;
}

export class StrategyCalculationRequest {
  marketId: number;
  timeFrame: string;
  from: string;
  to: string;
  strategyType: string;
  configuration: string;

  setConfiguration(configuration: any) {
    this.configuration = JSON.stringify(configuration);
  }

}
