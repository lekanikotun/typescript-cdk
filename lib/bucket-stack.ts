import * as cdk from '@aws-cdk/core';
import {Bucket, BucketProps, BucketEncryption} from "@aws-cdk/aws-s3";
import S3Bucket from "./bucket";

interface Props extends cdk.StackProps {
    encryptBucket?: boolean;
}

class S3Stack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: Props) {
        super(scope, id, props);
        const options = {}
        if (props?.encryptBucket) {
            // @ts-ignore
            options.encryption = BucketEncryption.KMS_MANAGED;
        }

        const bucket:Bucket = new S3Bucket(this, 'EncryptedBucket', options as BucketProps);

        new cdk.CfnOutput(this, 'DocumentsBucketNameExport', {
          value: bucket.bucketName,
          exportName: 'DocumentsBucketName'
        });
    }
}

export default S3Stack;
