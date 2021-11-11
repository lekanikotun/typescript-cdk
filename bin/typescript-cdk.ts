#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import S3Stack from '../lib/bucket-stack';
import Networking from "../lib/networking-stack";

const app = new cdk.App();
const Tags = cdk.Tags;

const s3Stack = new S3Stack(app, 'S3Stack', {
    env: {region: "us-east-1"},
    encryptBucket: true
});

const networkingStack = new Networking(app, 'NetworkingStack', {
    env: {region: "us-east-1"},
    maxAzs: 2
});

Tags.of(s3Stack).add("App", "DocumentManagement");
Tags.of(s3Stack).add("Environment", "Development");
Tags.of(networkingStack).add("Module", "Networking");