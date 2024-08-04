import {ApiProperty} from '@nestjs/swagger';
import {Expose, Type} from 'class-transformer';
import {IsEnum, IsNumber} from 'class-validator';
import {ECurrency} from 'src/shared/enums/currency.enum';

export class EstimateRequestDto {
  @Expose()
  @IsEnum(ECurrency)
  @ApiProperty({description: 'Input currency', enum: ECurrency, example: ECurrency.BTC})
  public inputCurrency: ECurrency;

  @Expose()
  @IsEnum(ECurrency)
  @ApiProperty({description: 'Output currency', enum: ECurrency, example: ECurrency.ETH})
  public outputCurrency: ECurrency;

  @Expose()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({description: 'Input amount', example: 2000})
  public inputAmount: number;
}
