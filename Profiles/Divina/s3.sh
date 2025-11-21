BUCKET="divina-teamfolio-profile"

# enable public website (note: CLI website configuration)
aws s3 website s3://$BUCKET/ --index-document index.html --region ca-central-1

# upload profile
aws s3 cp index.html s3://$BUCKET/index.html
aws s3 cp style.css s3://$BUCKET/style.css
aws s3 cp script.js s3://$BUCKET/script.js
aws s3 cp photo.jpg s3://$BUCKET/photo.jpg

# add public-read to uploaded objects
aws s3api put-bucket-policy --bucket $BUCKET --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::'"$BUCKET"'/*"
    }
  ]
}' --region ca-central-1