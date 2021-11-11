import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda-nodejs";
import { Runtime } from "@aws-cdk/aws-lambda";
import * as path from "path";
import {NodejsFunctionProps} from "@aws-cdk/aws-lambda-nodejs/lib/function";

interface DocumentManagementAPIProps extends NodejsFunctionProps {}

class DocumentManagementAP extends cdk.Construct {
    constructor(scope: cdk.Construct, id: string, props?: DocumentManagementAPIProps) {
        super(scope, id);
        // const getDocumentsFunction =
        new lambda.NodejsFunction(this, "GetDocumentsFunction", {
            runtime: Runtime.NODEJS_14_X,
            entry: path.join(__dirname, "..", "api", "getDocuments", "index.ts"),
            handler: "getDocuments",
            bundling: {
                externalModules: [
                    "aws-sdk"
                ]
            }
        })
    }
}

export default DocumentManagementAP;