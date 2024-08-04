import {Inject, Injectable} from '@nestjs/common';
import {ExchangeApi} from '../interfaces/exchange-api-service.interface';
import {GetRatesRequestDto} from '../dtos/get-rates-request.dto';
import {GetRatesResponseDto} from '../dtos/get-rates-response.dto';
import {EstimateRequestDto} from '../dtos/estimate-request.dto';
import {EstimateResponseDto} from '../dtos/estimate-response.dto';

@Injectable()
export class ExchangeService {
  constructor(@Inject('EXCHANGE_SERVICES') private readonly exchangeServices: ExchangeApi[]) {}

  public async getTicker(data: GetRatesRequestDto): Promise<GetRatesResponseDto[]> {
    const rates = await Promise.all(this.exchangeServices.map((service) => service.getTicker(data)));
    return rates;
  }

  public async getEstimate(data: EstimateRequestDto): Promise<EstimateResponseDto> {
    const rates = await this.getTicker({baseCurrency: data.inputCurrency, quoteCurrency: data.outputCurrency});
    const minRate = rates.reduce((min, rate) => (rate.rate < min.rate ? rate : min));
    return {
      exchangeName: minRate.exchangeName,
      outputAmount: data.inputAmount * minRate.rate,
    };
  }
}
