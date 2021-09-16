import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { Repository } from 'typeorm';
import { fileDto } from './dto/file.dto';
import { specificationDto } from './dto/specification.dto';
import { FileEntity } from './entities/file.entity';
import { SpecEntity } from './entities/specification.entity';
import shell = require('shelljs');

@Injectable()
export class AppService {

  // constructor(
  // @InjectRepository(SpecEntity) private specRepository: Repository<SpecEntity>)
  // // @InjectRepository(FileEntity) private fileRepository: Repository<FileEntity>)
  // {
  //   this.specRepository=specRepository
  //   // this.fileRepository=fileRepository
  // }
  getHello(): string {
    return 'Hello World!';
  }
    // 인자값 data:specificationDto port number를 얻으면 EXPOSE portNumber
    async createdocker(data:specificationDto, ){ 
      //data.runtime
      const gcpurl = "/home/computer7214/clone/"
      shell.exec(`git clone ${data.sourcecodeURL} /home/computer7214/clone/${data.functionName}`)
      var line ="FROM "+data.runtime +" AS builder\n"
      fs.writeFileSync(gcpurl+data.functionName+"/Dockerfile",line,'utf-8',)
      //setting Path project directory
      line = "WORKDIR /app\n"+"COPY . .\n"+"RUN npm install\nRUN npm run build\n\n"+
      "FROM "+data.runtime +"\n"+"COPY --from=builder /app ./\n"+"CMD [\"npm\",\"run\",\"start:prod\"]\n"
      fs.appendFileSync(gcpurl+data.functionName+"/Dockerfile",line,'utf-8',)
      
    
      //dockerignore
      line = "node_modules\ndist"
      fs.writeFileSync(gcpurl+data.functionName+"/.dockerignore",line,'utf-8',)
      
  
      //update json.file
      // line = "\"prestart:prod\": \"rimraf dist && npm run build\","
      // fs.readFile("/home/ec2-user/gyuwon/server/user/package.json",,)
      // fs.writeFile("/home/ec2-user/gyuwon/server/user/package.json",)

      shell.exec(`docker build -t dhd6573/${data.functionName}:demo ${gcpurl}${data.functionName}/.`)
      shell.exec(`docker push dhd6573/${data.functionName}:demo`)
    }
  //------------------File CRUD----------------------------

  // async createFile(data:fileDto){
  //   return this.fileRepository.save(data)
  // }

  // async findOneFile(id: string, name:string){
  //   return this.fileRepository.findOne({userId:id}&&{functionName:name})
  // }
  
  // async updateFile(id: string, name:string, data:fileDto){
  //   return this.fileRepository.update(data,{userId:id}&&{functionName:name})
  // }

  // async deleteFile(id: string, name:string){
  //   return this.fileRepository.delete({userId:id}&&{functionName:name})
  // }

  //------------------Spec CRUD----------------------------

//   async createSpec(data:specificationDto){
//     return this.specRepository.save(data)
//   }

//   async findOneSpec(id: string, name:string){
//     return this.specRepository.findOne({userId:id}&&{functionName:name})
//   }

//   async updateSpec(id: string, name:string, data:specificationDto){
//     return this.specRepository.update(data,{userId:id}&&{functionName:name})
//   }

//   async deleteSpec(id: string, name:string){
//     return this.specRepository.delete({userId:id}&&{functionName:name})
//   }
}
