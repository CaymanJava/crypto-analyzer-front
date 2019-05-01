export class IndicatorCalculationRequest {
  marketId: number;
  timeFrame: string;
  from: string;
  to: string;
  indicatorType: string;
  configuration: string;

  setConfiguration(configuration: any) {
    this.configuration = JSON.stringify(configuration);
  }

}

export class IndicatorItem {
  label: string;
  title: string;
}

export class IndicatorSettings {
  indicatorItem: IndicatorItem;
  configuration: any;
  updatable: boolean;
  update: boolean;

  constructor(indicatorItem: IndicatorItem, configuration: any, updatable: boolean, update: boolean) {
    this.indicatorItem = indicatorItem;
    this.configuration = configuration;
    this.updatable = updatable;
    this.update = update;
  }
}

export class IndicatorDrawResult {
  title: string;
  plotNumber: number;

  constructor(title: string, plotNumber: number) {
    this.title = title;
    this.plotNumber = plotNumber;
  }
}

export class IndicatorConfigurationHandler {
  shortLabel: string;
  plotNumber: number;
  indicatorItem: IndicatorItem;
  configuration: any;
  updatable: boolean;
  data: any[];

  constructor(shortLabel: string, plotNumber: number,
              indicatorItem: IndicatorItem, configuration: any,
              updatable: boolean, data: any[]) {
    this.shortLabel = shortLabel;
    this.plotNumber = plotNumber;
    this.indicatorItem = indicatorItem;
    this.configuration = configuration;
    this.updatable = updatable;
    this.data = data;
  }
}
