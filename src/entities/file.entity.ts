import { file } from "src/interfaces/interface-file";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'file'})
export class FileEntity implements file{
    @PrimaryGeneratedColumn()
    userId: string;
    @Column()
    functionName:string;
    @Column()
    endpoint: string;
}