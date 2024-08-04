import {EExchange} from 'src/shared/enums/exchange.enum';
import {GetRatesRequestDto} from '../dtos/get-rates-request.dto';
import {GetRatesResponseDto} from '../dtos/get-rates-response.dto';

export interface ExchangeApi {
  exchangeName: EExchange;
  getTicker(data: GetRatesRequestDto): Promise<GetRatesResponseDto>;
}
