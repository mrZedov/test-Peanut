import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ExchangeModule} from './exchange/exchange.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `services/.backend.env.${process.env.NODE_ENV}`,
    }),
    ExchangeModule,
  ],
})
export class AppModule {}
