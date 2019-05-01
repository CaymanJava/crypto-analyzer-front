import { Observable } from "rxjs";
import { Dashboard } from "./dashboard.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DashboardService {

  constructor() {
  }

  public getDashboardStatistic(): Observable<Dashboard> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.getMockDashboard());
      }, 1000);
    });
  }

  private getMockDashboard(): Dashboard {
    const dashboard = new Dashboard();

    dashboard.stockCount = 290;
    dashboard.marketCount = 6021;
    dashboard.monitorCount = 76;
    dashboard.signalCount = 120;
    dashboard.topVolumeMarkets = [
      {
        stock: 'BITTREX',
        marketId: 12,
        marketCurrency: 'RLC',
        marketCurrencyLong: 'iEx.ec',
        baseCurrency: 'BTC',
        volume: 43.68,
        priceDiff: 24.1,
        logoUrl: 'https://bittrexblobstorage.blob.core.windows.net/public/b088c74b-383d-4abb-84cf-343b826292d3.png'
      },
      {
        stock: 'BITTREX',
        marketId: 67,
        marketCurrency: 'RVN',
        marketCurrencyLong: 'RavenCoin',
        baseCurrency: 'BTC',
        volume: 21.87,
        priceDiff: -6.4,
        logoUrl: 'https://bittrex.com/Content/img/symbols/BTC.png'
      },
      {
        stock: 'BITTREX',
        marketId: 15,
        marketCurrency: 'VTC',
        marketCurrencyLong: 'Vertcoin',
        baseCurrency: 'BTC',
        volume: 17.99,
        priceDiff: -11.4,
        logoUrl: null
      }
    ];
    dashboard.lastAddedMarkets = [
      {
        stock: 'BITTREX',
        marketId: 3,
        marketCurrency: 'OMG-BTC',
        marketName: 'OmiseGO',
        logoUrl: 'https://bittrexblobstorage.blob.core.windows.net/public/67b5fabb-dc86-43ac-994c-86b84c331170.png',
      },
      {
        stock: 'BITTREX',
        marketId: 34,
        marketCurrency: 'ZEN-BTC',
        marketName: 'Horizen',
        logoUrl: 'https://bittrexblobstorage.blob.core.windows.net/public/232715d8-8b40-4e64-9e28-5290e08ac0ea.png',
      },
      {
        stock: 'BITTREX',
        marketId: 45,
        marketCurrency: 'TX-BTC',
        marketName: 'TransferCoin',
        logoUrl: 'https://bittrexblobstorage.blob.core.windows.net/public/9c472781-4ead-40be-b422-568b36a6d5b5.png',
      },
      {
        stock: 'BITTREX',
        marketId: 98,
        marketCurrency: 'NMR-BTC',
        marketName: 'Numeraire',
        logoUrl: 'https://bittrexblobstorage.blob.core.windows.net/public/b3e860db-65a8-455c-a954-23439b96d390.png',
      },
    ];

    dashboard.lastSignalsData = [40, 80, 20, 90, 30, 80, 40, 90, 20, 80, 30, 45, 50, 110, 90, 145, 120, 135, 120, 140];

    return dashboard;
  }

}
