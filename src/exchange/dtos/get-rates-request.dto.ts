import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsEnum} from 'class-validator';
import {ECurrency} from 'src/shared/enums/currency.enum';

export class GetRatesRequestDto {
  @Expose()
  @IsEnum(ECurrency)
  @ApiProperty({description: 'Base currency', enum: ECurrency, example: ECurrency.BTC})
  public baseCurrency: ECurrency;

  @Expose()
  @IsEnum(ECurrency)
  @ApiProperty({description: 'Quote currency', enum: ECurrency, example: ECurrency.ETH})
  public quoteCurrency: ECurrency;
}
