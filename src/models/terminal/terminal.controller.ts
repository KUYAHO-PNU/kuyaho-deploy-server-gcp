import { Body, Controller, Get, Post } from "@nestjs/common";
import { TerminalResGet } from "./dto/TerminalResGet.dto";
import { TerminalService } from "./terminal.service";

@Controller("terminal")
export class TerminalController {
  constructor(readonly TerminalService: TerminalService) {}

  @Get("/get")
  getResponse(@Body() cmd: string): Promise<TerminalResGet[] | string> {
    return this.TerminalService.getResponse(cmd);
  }

  @Post("/post")
  postResponse(@Body() postCmd: TerminalResGet): Promise<TerminalResGet> {
    return this.TerminalService.postResponse(postCmd);
  }
}
