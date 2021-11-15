import * as cdk from '@aws-cdk/core';
import {Bucket, BucketProps, BucketEncryption} from "@aws-cdk/aws-s3";
import { VpcProps } from "@aws-cdk/aws-ec2";
import S3Bucket from "./bucket";
import Networking from "./networking";
import DocumentManagementAPI from "./api";

export interface Props {
    stackProps?: cdk.StackProps;
    bucketProps?: BucketProps;
    vpcProps?:  VpcProps;
    encryptBucket?: boolean;
}

class TypescriptCdkStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: Props) {
        super(scope, id, props?.stackProps);

        // s3 bucket
        const bucketOptions = {}
        let bucketName = "UnencryptedBucket";
        if (props?.encryptBucket) {
            // @ts-ignore
            bucketOptions.encryption = BucketEncryption.KMS_MANAGED;
            bucketName = "EncryptedBucket"
        }
        const bucket:Bucket = new S3Bucket(this, bucketName, bucketOptions as BucketProps);

        new cdk.CfnOutput(this, 'DocumentsBucketNameExport', {
          value: bucket.bucketName,
          exportName: 'DocumentsBucketName'
        });

        // networking
        const networkingStack = new Networking(this, 'NetworkingConstruct', props?.vpcProps);
        cdk.Tags.of(networkingStack).add("Module", "Networking");

        // lambda-Nodejs
        const api = new DocumentManagementAPI(this, 'DocumentManagementAPI', {
            documentBucket: bucket
        });
        cdk.Tags.of(api).add("Module", "API")
    }
}

export default TypescriptCdkStack;
