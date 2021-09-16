import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TerminalResEntity } from "./entities/TermianlCmdEntity.entity";
import { TerminalController } from "./terminal.controller";
import { TerminalService } from "./terminal.service";

@Module({
  imports: [TypeOrmModule.forFeature([TerminalResEntity])],
  controllers: [TerminalController],
  providers: [TerminalService],
  exports: [TerminalService],
})
export class TerminalModule {}
