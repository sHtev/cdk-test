import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep } from 'aws-cdk-lib/pipelines';
import { CdkTestAppStage } from './cdk-test-app-stage';

export class CdkTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'CdkTest',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('sHtev/cdk-test', 'main', {
          connectionArn: 'arn:aws:codestar-connections:eu-west-2:723455457584:connection/746bb8dc-66fc-490d-880f-520284ce8550',
        }),
        installCommands: ['npm i -g npm@latest'],
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });

    const testingStage = pipeline.addStage(new CdkTestAppStage(this, "test", {
      env: { account: '723455457584', region: 'eu-west-2' }
    }));

    testingStage.addPost(new ManualApprovalStep('approval'));
  }
}
