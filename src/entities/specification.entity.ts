
import { specification } from 'src/interfaces/interface-specification';
import { Column, Entity,  PrimaryGeneratedColumn } from 'typeorm'

@Entity({name : 'specification'})
export class SpecEntity implements specification{
    @PrimaryGeneratedColumn()
    userId: string;
    @Column({length:20})
    functionName: string;
    @Column()
    environments: string;
    @Column()
    region: string;
    @Column()
    imageConfig: string;
    @Column()
    memorySize: number;
    @Column()
    runtime: string;
    @Column()
    timeout: number;
    @Column()
    vpcConfig: string;
    @Column()
    port: number;
    @Column()
    sourceCodeURL: string;
}

