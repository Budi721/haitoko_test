import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { getEnvPath } from './common/helper/env.helper';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { AuthenticationsModule } from './api/authentications/authentications.module';
import { ProductsModule } from './api/products/products.module';
import { PaymentsModule } from './api/payments/payments.module';
import { OrdersModule } from './api/orders/orders.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AuthenticationsModule,
    ProductsModule,
    PaymentsModule,
    OrdersModule,
  ],
  controllers: [], // controller
  providers: [], //services
})
export class AppModule {}
