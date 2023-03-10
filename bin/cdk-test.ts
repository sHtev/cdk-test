#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkTestStack } from '../lib/cdk-test-stack';

const app = new cdk.App();
new CdkTestStack(app, 'CdkTestStack', {
  env: {
    account: '723455457584',
    region: 'eu-west-2',
  }
});

app.synth();