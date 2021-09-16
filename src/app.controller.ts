import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { specificationDto } from './dto/specification.dto';


@Controller("spec")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post("/createDockerFile")
  createdocker(@Body() data:specificationDto) {
  
    return this.appService.createdocker(data);
  }
//   @Get('/specfind')
//   async specFind(@Query('userId') id:string,@Query('functionName') name:string){
//     return this.appService.findOneSpec(id,name)
//   }
//   // @Body() inputData:specificationDto
//   @Post('/speccreate')
//   async specCreate():Promise<specificationDto>{
//     // const result = await this.appService.createSpec(data)
//     const result :specificationDto= {
//       userId:"",
//       functionName:"",
//       environments:"",
//       imageConfig:"",
//       memorySize:0,
//       region:"",
//       runtime:"",
//       timeout:0,
//       vpcConfig:"",
//     }
//     return Object.assign({
//       data:result,
//       statusCode:201,
//       statusMsg: '데이터가 성공적으로 생성되었습니다.',
//     })
//   }
//   @Put('/specupdate')
//   async specUpdate(@Query('userId') id:string, @Query('functionName') name:string, 
//   @Body() inputdata:specificationDto):Promise<specificationDto>{
//     const result =await this.appService.updateSpec(id,name,inputdata)
//     return Object.assign({
//       data:result,
//       statusCode:202,
//       statusMsg: `데이터가 성공적으로 갱신되었습니다.`,
//     })
//   }
//   @Delete('/specdelete')
//   async specdelete(@Query('userId') id:string,@Query('functionName') name:string){
//     const result = await this.appService.deleteSpec(id,name)
//     return Object.assign({
//       data:result,
//       statusCode:203,
//       statusMsg: `데이터가 성공적으로 삭제되었습니다.`,
//     })
//   }
}
