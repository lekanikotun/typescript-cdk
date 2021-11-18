import {
  CreateBucketOutput,
  ListBucketsOutput,
  GetBucketLifecycleConfigurationOutput,
} from "aws-sdk/clients/s3";
import client from "./client";
import { objects } from ".";

export const remove = async (bucket: string): Promise<void> => {
  const { Contents } = await objects.list(bucket);

  // a bucket must be empty in order to be removed
  if (Contents?.length) {
    const itemsToDelete = Contents.map((item) => ({
      Key: item.Key as string,
    }));

    await client
      .deleteObjects({
        Bucket: bucket,
        Delete: { Objects: itemsToDelete },
      })
      .promise();
  }

  await client.deleteBucket({ Bucket: bucket }).promise();
};

export const list = async (): Promise<ListBucketsOutput> => {
  const response = await client.listBuckets().promise();
  return response;
};

export const create = async (bucket: string): Promise<CreateBucketOutput> => {
  const response = await client
    .createBucket({
      Bucket: bucket,
      ACL: "private",
    })
    .promise();

  return response;
};

export const exists = async (bucket: string): Promise<boolean> => {
  try {
    await client.headBucket({ Bucket: bucket }).promise();
    return true;
  } catch {
    return false;
  }
};

// this is used to set the expiration of objects in days for a particular bucket
export const updateLifecycleConfiguration = async (
  bucket: string,
  expiration: number
): Promise<void> => {
  await client
    .putBucketLifecycleConfiguration({
      Bucket: bucket,
      LifecycleConfiguration: {
        Rules: [
          {
            Filter: {
              Prefix: "",
            },
            Status: "Enabled",
            Expiration: {
              Days: expiration,
            },
          },
        ],
      },
    })
    .promise();
};

export const getLifecycleConfiguration = async (
  bucket: string
): Promise<GetBucketLifecycleConfigurationOutput> => {
  const response = await client
    .getBucketLifecycleConfiguration({ Bucket: bucket })
    .promise();
  return response;
};
