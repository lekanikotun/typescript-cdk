import cdk from '@aws-cdk/core';
import {Bucket, BucketProps} from "@aws-cdk/aws-s3";

const defaultProps = {
    removalPolicy: cdk.RemovalPolicy.DESTROY,
}

class S3Bucket extends Bucket {
    constructor(scope: cdk.Construct, id: string, props?: BucketProps) {
        super(scope, id);

        new Bucket(this, id, {
            ...defaultProps,
            ...props
        });
    }
}

export default S3Bucket;