import {ApiProperty} from '@nestjs/swagger';
import {EExchange} from 'src/shared/enums/exchange.enum';

export class EstimateResponseDto {
  @ApiProperty({description: 'Exchange name', enum: EExchange, example: EExchange.Binance})
  public exchangeName: EExchange;

  @ApiProperty({description: 'Output amount', example: 20.01})
  public outputAmount: number;
}
