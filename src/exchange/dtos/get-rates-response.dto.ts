import {ApiProperty} from '@nestjs/swagger';
import {EExchange} from 'src/shared/enums/exchange.enum';

export class GetRatesResponseDto {
  @ApiProperty({description: 'Exchange name', enum: EExchange, example: EExchange.Binance})
  public exchangeName: EExchange;

  @ApiProperty({description: 'Rate', example: 20.01})
  public rate: number;
}
