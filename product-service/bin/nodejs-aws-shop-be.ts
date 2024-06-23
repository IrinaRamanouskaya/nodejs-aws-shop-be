#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { NodejsAwsShopBeStack } from '../lib/nodejs-aws-shop-be-stack';

const app = new cdk.App();
new NodejsAwsShopBeStack(app, 'NodejsAwsShopBeStack', {
});