import { environment } from "./interface-enviroment";

export interface specification{
    environments: String;
    functionName: String;
    region: String;
    imageConfig: String;
    memorySize: Number;
    runtime: String;
    timeout: Number;
    vpcConfig: String;
    userId: String;
    port:Number;
    sourceCodeURL:String;
}