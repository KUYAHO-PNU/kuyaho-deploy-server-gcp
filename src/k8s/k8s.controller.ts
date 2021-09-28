import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { specificationDto } from 'src/dto/specification.dto';
import { K8sService } from './k8s.service';

@Controller('k8s')
export class K8sController {
    constructor(private readonly containerService: K8sService) {}

    @Post('createDeployment')
    // const image = 'cloudnatived/demo:hello'
    async createDeployment(@Body() data:any): Promise<any> {
        return await this.containerService.createDeployment(data.name, data.image, data.port, data.cpu, data.memory);
    }

    @Post('createService')
    async createService(@Body() data: any): Promise<String> {
        return await this.containerService.createService(data.name, data.port);
    }

    @Post('deleteAll')
    async deleteAll(@Body() data:any): Promise<String> {
        return await this.containerService.deleteAll(data.name);
    }

    @Get('getPods')
    async getPods(): Promise<Array<Object>> {
        return await this.containerService.getPods();
    }
    @Get('getPodByName')
    async getPodByName(@Query('name') functionName: string){
        return await this. containerService.getPodByName(functionName);
    }

    @Get('getServices')
    async getServices(): Promise<Array<Object>> {
        return await this.containerService.getServices();
    }

    @Get('getDeploymentYaml')
    async getDeploymentYaml(@Query('name') functionName: string): Promise<Array<Object>> {
        return await this.containerService.getDeploymentYaml(functionName);
    }

    @Get('getServiceYaml')
    async getServiceYaml(@Query('name') functionName: string): Promise<Array<Object>> {
        return await this.containerService.getServiceYaml(functionName);
    }
    
    // @Get('portForwarding')
    // async portForwarding(): Promise<any> {
    //     const name = 'demo';
    //     const targetPort = 9999;
    //     const port = 8888;
    //     return await this.containerService.portForwarding(name, targetPort, port);
    // }
}
