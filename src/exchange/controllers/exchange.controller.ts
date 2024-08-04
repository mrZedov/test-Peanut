import {ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Get, Post} from '@nestjs/common';
import {ExchangeService} from '../services/exchange.service';
import {ExchangeEndpoint} from 'src/shared/endpoints/exchange.endpoint';
import {GetRatesRequestDto} from '../dtos/get-rates-request.dto';
import {GetRatesResponseDto} from '../dtos/get-rates-response.dto';
import {EstimateRequestDto} from '../dtos/estimate-request.dto';
import {EstimateResponseDto} from '../dtos/estimate-response.dto';

@ApiTags(ExchangeEndpoint.ApiTags)
@Controller(ExchangeEndpoint.Controller.GroupAPI)
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Post(ExchangeEndpoint.Controller.GetRates)
  @ApiOperation({description: 'Get rates'})
  @ApiOkResponse({type: [GetRatesResponseDto]})
  public async getRequest(@Body() data: GetRatesRequestDto): Promise<GetRatesResponseDto[]> {
    return await this.exchangeService.getTicker(data);
  }

  @Post(ExchangeEndpoint.Controller.Estimate)
  @ApiOperation({description: 'Calculate estimate'})
  @ApiOkResponse({type: EstimateResponseDto})
  public async getEstimate(@Body() data: EstimateRequestDto): Promise<EstimateResponseDto> {
    return await this.exchangeService.getEstimate(data);
  }
}
