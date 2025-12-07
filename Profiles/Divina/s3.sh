#!/bin/bash

BUCKET="divina-teamfolio-profile"
REGION="ca-central-1"
CF_DISTRIBUTION_ID="E1ZMNDFKGF6406"
AWS_ACCOUNT_ID="887232293623"

# 1️⃣ Configure S3 as static website
aws s3 website s3://$BUCKET/ --index-document index.html --region $REGION

# 2️⃣ Upload website files
aws s3 cp index.html s3://$BUCKET/index.html --region $REGION
aws s3 cp style.css s3://$BUCKET/style.css --region $REGION
aws s3 cp script.js s3://$BUCKET/script.js --region $REGION
aws s3 cp photo.jpg s3://$BUCKET/photo.jpg --region $REGION

# 3️⃣ Apply CloudFront-only bucket policy
aws s3api put-bucket-policy --bucket $BUCKET --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::'"$BUCKET"'/*",
      "Condition": {
        "ArnLike": {
          "AWS:SourceArn": "arn:aws:cloudfront::'"$AWS_ACCOUNT_ID"':distribution/'"$CF_DISTRIBUTION_ID"'"
        }
      }
    }
  ]
}' --region $REGION