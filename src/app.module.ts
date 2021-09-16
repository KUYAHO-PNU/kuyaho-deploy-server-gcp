import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { DatabaseType } from "typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MysqlConfigModule } from "./config/database/mysql-config.module";
import { MysqlConfigService } from "./config/database/mysql-config.service";
import { FileEntity } from "./entities/file.entity";
import { SpecEntity } from "./entities/specification.entity";
import { TerminalResEntity } from "./models/terminal/entities/TermianlCmdEntity.entity";
import { TerminalController } from "./models/terminal/terminal.controller";
import { TerminalModule } from "./models/terminal/terminal.module";
import { MysqlConfigModuleProvider } from "./provider/provider.module";
import { K8sController } from './k8s/k8s.controller';
import { K8sService } from './k8s/k8s.service';
import { K8sModule } from './k8s/k8s.module';

@Module({
  imports: [MysqlConfigModuleProvider, TerminalModule, K8sModule],
  controllers: [AppController, TerminalController, K8sController],
  providers: [AppService, K8sService],
})
export class AppModule {}
