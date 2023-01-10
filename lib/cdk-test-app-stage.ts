import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { TestLambdaStack } from './cdk-test-lambda-stack';

export class CdkTestAppStage extends cdk.Stage {
    
    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
      super(scope, id, props);
  
      const lambdaStack = new TestLambdaStack(this, 'LambdaStack');      
    }
}