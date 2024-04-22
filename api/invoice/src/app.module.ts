import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { InvoiceModule } from './invoice/invoice.module';
import { UserEntity } from './user/entities/user.entity';
import { InvoiceEntity } from './invoice/entities/invoice.entity';
import { InvoiceItemEntity } from './invoice/entities/invoice-item.entity';
import { AuthModule } from './auth/auth.module';

import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [databaseConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [UserEntity, InvoiceEntity, InvoiceItemEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    InvoiceModule,
    AuthModule,
  ],
})
export class AppModule {}
