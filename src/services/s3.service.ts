import path from "node:path";

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { UploadedFile } from "express-fileupload";

import { configs } from "../configs/configs";
import { FileValidator } from "../validators/file.validator";

class S3Service {
  constructor(
    private readonly s3Client = new S3Client({
      forcePathStyle: true,
      region: configs.AWS_REGION,
      credentials: {
        accessKeyId: configs.AWS_ACCESS_KEY,
        secretAccessKey: configs.AWS_SECRET_ACCESS_KEY,
      },
    }),
  ) {}

  public async uploadFile(
    itemType: "user",
    itemId: string,
    file: UploadedFile,
  ): Promise<string> {
    const { error } = FileValidator.uploadFile.validate({
      size: file.size,
      mimetype: file.mimetype,
    });
    if (error) {
      throw new Error(`File validation error: ${error.message}`);
    }
    const filePath = `${itemType}/${itemId}/${randomUUID()}${path.extname(file.name)}`;
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: configs.AWS_BUCKET_NAME,
        Key: filePath,
        Body: file.data,
        ACL: configs.AWS_S3_ACL,
        ContentType: file.mimetype,
      }),
    );

    return filePath;
  }

  public async deleteFile(itemPath: string): Promise<void> {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: configs.AWS_BUCKET_NAME,
        Key: itemPath,
      }),
    );
    console.log(`Deleted: ${itemPath}`);
  }
}

export const s3Service = new S3Service();
