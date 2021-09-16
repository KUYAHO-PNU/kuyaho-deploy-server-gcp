import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TerminalResGet } from "./dto/TerminalResGet.dto";
import { TerminalResEntity } from "./entities/TermianlCmdEntity.entity";

@Injectable()
export class TerminalService {
  constructor(
    @InjectRepository(TerminalResEntity)
    private readonly TerminalRepository: Repository<TerminalResEntity>
  ) {}

  async getResponse(cmd: string): Promise<TerminalResGet[] | string> {
    if (cmd === "ls") {
      return this.TerminalRepository.find();
    } else {
      return `- cmd : cmd ${cmd} not found`;
    }
  }

  async postResponse(terminalRes: TerminalResGet): Promise<TerminalResGet> {
    console.log(terminalRes);
    return this.TerminalRepository.save(terminalRes);
  }
}
