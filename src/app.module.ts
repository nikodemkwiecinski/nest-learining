import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as Joi from '@hapi/joi';
import { TestEntityModule } from './data-access-layer/test-entity/test-entity.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().integer().positive().default(5432),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().optional(),
        DATABASE_NAME: Joi.string().required(),
        NEST_SYNCHRONIZE: Joi.string().default('false'),
        SLOW_QUERY_THRESHOLD_MS: Joi.number().integer().min(0).default(1000),
      }),
      envFilePath: ['.env', '.env.local'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: configService.get('NEST_SYNCHRONIZE') === 'true',
        namingStrategy: new SnakeNamingStrategy(),
        extra: {
          connectionLimit: 100,
        },
        logging: ['query', 'error', 'warn'],
        maxQueryExecutionTime: configService.get('SLOW_QUERY_THRESHOLD_MS'),
      }),
    }),
    TestEntityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
