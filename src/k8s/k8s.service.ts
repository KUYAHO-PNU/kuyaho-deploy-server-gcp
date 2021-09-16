import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { delay } from 'rxjs';
import shell = require('shelljs')
import YAML = require('yamljs')

const ec2_path = `/home/computer7214/clone`;

@Injectable()
export class K8sService { 

  /*
  async createContainer(): Promise<any> {
      //shell.cd('~');
      //shell.exec('ls -la');
      //shell.echo('hello');
      const name = 'demo';
      const dockerID = "id";
      const imageName = 'myhello';
      const newPort = 9999;
      const originPort = 8888;
      shell.exec(`kubectl run ${name} --image=${dockerID}/${imageName} --port=${newPort} --labels app=${name}`);
      shell.exec(`kubectl port-forward ${name} ${newPort}:${originPort}`);
      //kubectl apply -f echo-pod.yml
  }
  */

  async createDeployment(name: String, image: String, port: string): Promise<any> {
    const data = `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${name}-deployment
  labels:
    app: ${name}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ${name}
  template:
    metadata:
      labels:
        app: ${name}
    spec:
      containers:
      - name: ${name}
        image: ${image}
        ports:
        - containerPort: ${port}`;
    try {
      fs.writeFileSync(`${ec2_path}/${name}/deployment.yaml`, data, 'utf8');
      console.log(name + ' deployment.yaml 파일 생성 완료');
      shell.exec(`kubectl apply -f ${ec2_path}/${name}/deployment.yaml`);
    }
    catch(err) {
      console.log(name + ' deployment.yaml 파일 생성 중 에러\n' + err); 
    }
  }

  async createService(name: String, port: string): Promise<String> {
    const data = `
apiVersion: v1
kind: Service
metadata:
  name: ${name}-service
  labels:
    app: ${name}
spec:
  ports:
  - port: ${port}
    protocol: TCP
  selector:
    app: ${name}
  type: LoadBalancer`;
    try {
      fs.writeFileSync(`${ec2_path}/${name}/service.yaml`, data, 'utf8');
      console.log(name + ' service.yaml 파일 생성 완료');
      shell.exec(`kubectl apply -f ${ec2_path}/${name}/service.yaml`);
    }
    catch(err) {
      console.log(name + ' service.yaml 파일 생성 중 에러\n' + err);
      return err;
    }
  }

  async deleteAll(name: String): Promise<String> {
    shell.exec(`kubectl delete all --selector app=${name}`);
    return `kubectl delete all --selector app=${name}`;
  }

  // async portForwarding(name: String, targetPort: Number, port: Number): Promise<any> {
  //   shell.exec(`kubectl port-forward service/${name}-service ${targetPort}:${port}`);
  // }

  async getPods(): Promise<Array<any>> {
    shell.exec('kubectl get pods -o yaml > pods.yaml')
    shell.exec('yaml2json pods.yaml > pods.json')

    return new Promise<any>((resolve, reject) => {
      fs.readFile('pods.json',(err,data)=>{
        if(err){
          reject(err)
        }else{resolve(JSON.parse(data.toString()))}
      })  
    })
    

  }
  async getPodByName(name: string): Promise<Array<any>> {
    shell.exec(`kubectl get pods ${name} -o yaml > pods.yaml`)
    shell.exec('yaml2json pods.yaml > pods.json')

    return new Promise<any>((resolve, reject) => {
      fs.readFile('pods.json',(err,data)=>{
        if(err){
          reject(err)
        }else{resolve(JSON.parse(data.toString()))}
      })  
    })
  }

  async getServices(): Promise<Array<Object>> {
    
    shell.exec(`kubectl get service -o yaml > service.yaml`)
    shell.exec('yaml2json service.yaml > service.json')

    return new Promise<any>((resolve, reject) => {
      fs.readFile('service.json',(err,data)=>{
        if(err){
          reject(err)
        }else{resolve(JSON.parse(data.toString()))}
      })  
    })
  }
    
        
}

