import * as cdk from '@aws-cdk/core';
import {Bucket, BucketProps} from "@aws-cdk/aws-s3";

class S3Bucket extends Bucket {
    constructor(scope: cdk.Construct, id: string, props?: BucketProps) {
        super(scope, id);

        new Bucket(this, id, {
            // default props
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            ...props
        });
    }
}

export default S3Bucket;