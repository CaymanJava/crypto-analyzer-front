import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Stock } from "./stock.model";

@Injectable({
  providedIn: "root"
})
export class StockService {

  stocks = [
    {
      'id': 'BITTREX',
      'name': 'Bittrex',
      'url': 'https://international.bittrex.com',
      'marketSize': 276,
      'image': './assets/images/stocks/bittrex.png'
    },
    {
      'id': 'BINANCE',
      'name': 'Binance',
      'url': 'https://www.binance.com',
      'marketSize': 187,
      'image': './assets/images/stocks/binance.jpg'
    },
    {
      'id': 'OKEX',
      'name': 'OKEx',
      'url': 'https://www.okex.com/',
      'marketSize': 204,
      'image': './assets/images/stocks/OKEx.jpg'
    },
    {
      'id': 'DIGI_FINEX',
      'name': 'DigiFinex',
      'url': 'https://www.digifinex.com',
      'marketSize': 308,
      'image': './assets/images/stocks/digifienx.jpg'
    },
    {
      'id': 'BIT_Z',
      'name': 'Bit-Z',
      'url': 'https://www.bit-z.com',
      'marketSize': 164,
      'image': './assets/images/stocks/bit-z.jpg'
    },
    {
      'id': 'ZB_COM',
      'name': 'zb.com',
      'url': 'https://www.zb.com',
      'marketSize': 225,
      'image': './assets/images/stocks/zb.jpg'
    },
    {
      'id': 'COIN_BENE',
      'name': 'CoinBene',
      'url': 'https://www.coinbene.com',
      'marketSize': 225,
      'image': './assets/images/stocks/CoinBene.jpg'
    },
    {
      'id': 'BIT-FOREX',
      'name': 'BitForex',
      'url': 'https://www.bitforex.com/',
      'marketSize': 187,
      'image': './assets/images/stocks/BitForex.jpg'
    },
    {
      'id': 'IDAX',
      'name': 'IDAX',
      'url': 'https://www.idax.pro',
      'marketSize': 243,
      'image': './assets/images/stocks/idax.jpg'
    }
  ];

  public getStocks(): Observable<Stock[]> {
    return new Observable(observer => observer.next(this.stocks));
  }

}
