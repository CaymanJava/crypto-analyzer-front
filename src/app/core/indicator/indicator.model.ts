import { UUID } from 'angular2-uuid';

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

  constructor(title: string) {
    this.label = '';
    this.title = title;
  }
}

export class IndicatorSettings {
  indicatorItem: IndicatorItem;
  configuration: any;
  drawConfiguration: any;
  update: boolean;

  constructor(indicatorItem: IndicatorItem, configuration: any,
              drawConfiguration: any, update: boolean) {
    this.indicatorItem = indicatorItem;
    this.configuration = configuration;
    this.drawConfiguration = drawConfiguration;
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
  id: string;
  shortLabel: string;
  plotNumber: number;
  indicatorItem: IndicatorItem;
  configuration: any;
  drawConfiguration: any;
  data: any[];

  constructor(shortLabel: string, plotNumber: number,
              indicatorItem: IndicatorItem, configuration: any,
              drawConfiguration: any, data: any[]) {
    this.id = UUID.UUID();
    this.shortLabel = shortLabel;
    this.plotNumber = plotNumber;
    this.indicatorItem = indicatorItem;
    this.configuration = configuration;
    this.drawConfiguration = drawConfiguration;
    this.data = data;
  }
}
