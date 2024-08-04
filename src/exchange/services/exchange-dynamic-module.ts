import {ExchangeService} from './exchange.service';
import {DynamicModule, Module, Provider} from '@nestjs/common';

@Module({})
export class ExchangeDynamicModule {
  static register(services: Provider[]): DynamicModule {
    const serviceClasses = services.filter((service) => typeof service === 'function');
    return {
      module: ExchangeDynamicModule,
      providers: [
        ExchangeService,
        ...services,
        {
          provide: 'EXCHANGE_SERVICES',
          useFactory: (...services: any[]) => services,
          inject: serviceClasses,
        },
      ],
      exports: [ExchangeService, 'EXCHANGE_SERVICES'],
    };
  }
}
