import {Module} from '@nestjs/common';
import {ExchangeController} from './controllers/exchange.controller';
import {ExchangeDynamicModule} from './services/exchange-dynamic-module';
import {ExchangeBinanceService} from './services/exchanges/exchange-binance.service';
import {ExchangeKucoinService} from './services/exchanges/exchange-kucoin.service';

@Module({
  imports: [ExchangeDynamicModule.register([ExchangeBinanceService, ExchangeKucoinService])],
  controllers: [ExchangeController],
})
export class ExchangeModule {}
