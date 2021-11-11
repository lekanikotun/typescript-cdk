import {Construct, Stack, StackProps} from '@aws-cdk/core';
import { VpcProps } from "@aws-cdk/aws-ec2";
import Networking from "./networking"

interface Props extends StackProps, VpcProps {}

class NetworkingStack extends Stack {
    constructor(scope: Construct, id: string, props?: Props) {
        super(scope, id);

        new Networking(this, id, props)
    }
}

export default NetworkingStack;
