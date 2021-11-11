import * as cdk from '@aws-cdk/core';
import { Vpc, SubnetType, IVpc, VpcProps } from "@aws-cdk/aws-ec2";

class Networking extends cdk.Construct {

    public readonly vpc:IVpc;
    constructor(scope: cdk.Construct, id: string, props?: VpcProps) {
        super(scope, id);

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

        this.vpc = new Vpc(this, id, {
            ...defaultProps,
            ...props
        });
    }
}

export default Networking;