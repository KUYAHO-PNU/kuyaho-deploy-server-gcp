import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TerminalBase } from "../interfaces/terminal-res-base.interface";

@Entity("terminal")
export class TerminalResEntity implements TerminalBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  res: string;
}
