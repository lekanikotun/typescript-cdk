import * as cdk from '@aws-cdk/core';
import { Vpc, SubnetType, VpcProps } from "@aws-cdk/aws-ec2";

const defaultProps = {
    cidr: "10.0.0.0/16",
    subnetConfiguration: [
        {
            cidrMask: 24,
            name: 'Public',
            subnetType: SubnetType.PUBLIC,
        },
        {
            cidrMask: 24,
            name: 'Private',
            subnetType: SubnetType.PRIVATE_WITH_NAT,
        }
    ]
}

class Networking extends cdk.Construct {
    constructor(scope: cdk.Construct, id: string, props?: VpcProps) {
        super(scope, id);

        new Vpc(this, id, {
            ...defaultProps,
            ...props
        });
    }
}

export default Networking;