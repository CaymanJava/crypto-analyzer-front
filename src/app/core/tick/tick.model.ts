import { Market } from "../market/market.model";

export class TickData {
  market: Market;
  timeFrame: TimeFrame;
  ticks: Tick[];
}

export enum TimeFrame {
  FIVE_MIN = '5 Min',
  FIFTEEN_MIN = '15 Min',
  THIRTY_MIN = '30 Min',
  ONE_HOUR = '1 Hour',
  FOUR_HOURS = '4 Hours',
  ONE_DAY = '1 Day'
}

export class Tick {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  baseVolume: number;
  tickTime: string;
}

export class TickPeriodRequest {
  marketId: number;
  timeFrame: string;
  period: number = 200;

  static defaultCountRequest(marketId: number, timeFrame: string) {
    const request = new TickPeriodRequest();
    request.marketId = marketId;
    request.timeFrame = timeFrame;
    return request;
  }

}

export class TickTimeRequest {
  marketId: number;
  timeFrame: string;
  from: string;
  to: string;

  constructor(marketId: number, timeFrame: string, from: string, to: string) {
    this.marketId = marketId;
    this.timeFrame = timeFrame;
    this.from = from;
    this.to = to;
  }

}
