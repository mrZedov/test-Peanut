import {Injectable} from '@nestjs/common';
import axios from 'axios';
import {GetRatesRequestDto} from 'src/exchange/dtos/get-rates-request.dto';
import {GetRatesResponseDto} from 'src/exchange/dtos/get-rates-response.dto';
import {ExchangeApi} from 'src/exchange/interfaces/exchange-api-service.interface';
import {SymbolRequest} from 'src/exchange/interfaces/symbols.interface';
import {ECurrency} from 'src/shared/enums/currency.enum';
import {EExchange} from 'src/shared/enums/exchange.enum';

@Injectable()
export class ExchangeKucoinService implements ExchangeApi {
  public exchangeName = EExchange.KuCoin;
  private baseUrl = 'https://api.kucoin.com/api/v1/';

  constructor() {}

  public async getTicker(data: GetRatesRequestDto): Promise<GetRatesResponseDto> {
    const paramExchangeRequest = this.getSymbols(data);
    const response = await axios.get(`${this.baseUrl}market/orderbook/level1?symbol=${paramExchangeRequest.symbol}`);
    const price = parseFloat(response.data.data.price);

    let rate: number;
    if (paramExchangeRequest.direction) rate = price;
    else if (price) rate = 1 / price;

    return {exchangeName: this.exchangeName, rate};
  }

  private getSymbols(data: GetRatesRequestDto): SymbolRequest {
    const validSymbol = this.checkIfValidSymbol(data);
    return validSymbol
      ? {symbol: `${data.baseCurrency}-${data.quoteCurrency}`, direction: true}
      : {symbol: `${data.quoteCurrency}-${data.baseCurrency}`, direction: false};
  }

  private checkIfValidSymbol(data: GetRatesRequestDto): boolean {
    if (data.baseCurrency === ECurrency.BTC && data.quoteCurrency === ECurrency.ETH) {
      return false;
    }
    return true;
  }
}
