export class Dashboard {
  stockCount: number;
  marketCount: number;
  monitorCount: number;
  signalCount: number;
  topVolumeMarkets: TopVolumeMarket[];
  lastAddedMarkets: LastAddedMarket[];
  lastSignalsData: number[];
}

export class TopVolumeMarket {
  stock: string;
  marketId: number;
  marketCurrency: string;
  marketCurrencyLong: string;
  baseCurrency: string;
  volume: number;
  priceDiff: number;
  logoUrl: string;
}

export class LastAddedMarket {
  stock: string;
  marketId: number;
  marketCurrency: string;
  marketName: string;
  logoUrl: string;
}
