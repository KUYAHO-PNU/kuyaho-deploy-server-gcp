import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { MysqlConfigModule } from "src/config/database/mysql-config.module";
import { MysqlConfigService } from "src/config/database/mysql-config.service";
import { TerminalResEntity } from "src/models/terminal/entities/TermianlCmdEntity.entity";
import { DatabaseType } from "typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [MysqlConfigModule],
      useFactory: async (config: MysqlConfigService) => ({
        type: "mysql" as DatabaseType,
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        entities: [TerminalResEntity],
        synchronize: false,
      }),
      inject: [MysqlConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class MysqlConfigModuleProvider {}
