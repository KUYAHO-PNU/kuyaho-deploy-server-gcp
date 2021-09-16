import { IsString } from "class-validator";
import { TerminalBase } from "../interfaces/terminal-res-base.interface";

export class TerminalResGet implements TerminalBase {
  @IsString()
  res: string;
}
