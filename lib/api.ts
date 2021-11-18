import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda-nodejs";
import { Runtime } from "@aws-cdk/aws-lambda";
import * as path from "path";
import s3 from "@aws-cdk/aws-s3";
import iam from "@aws-cdk/aws-iam";

interface DocumentManagementAPIProps {
    documentBucket: s3.IBucket;
}

class DocumentManagementAP extends cdk.Construct {
    constructor(scope: cdk.Construct, id: string, props: DocumentManagementAPIProps) {
        super(scope, id);
        const getDocumentsFunction = new lambda.NodejsFunction(this, "GetDocumentsFunction", {
            runtime: Runtime.NODEJS_14_X,
            entry: path.join(__dirname, "..", "api", "getDocuments", "index.ts"),
            handler: "getDocuments",
            bundling: {
                externalModules: [
                    "aws-sdk"
                ]
            },
            environment: {
                DOCUMENTS_BUCKET_NAME: props.documentBucket.bucketName
            }
        });

        const bucketPermissions = new iam.PolicyStatement();
        bucketPermissions.addResources(`${props.documentBucket.bucketArn}/*`);
        bucketPermissions.addActions("s3:GetObject", "s3.PutObject");
        getDocumentsFunction.addToRolePolicy((bucketPermissions));

        const bucketContainerPermissions = new iam.PolicyStatement();
        bucketContainerPermissions.addResources(props.documentBucket.bucketArn);
        bucketContainerPermissions.addActions("s3:ListBucket");
        getDocumentsFunction.addToRolePolicy((bucketContainerPermissions));
    }
}

export default DocumentManagementAP;