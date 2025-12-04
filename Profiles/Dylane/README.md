This repository contains the personal profile webpage for Dylane, built and deployed as part of a collaborative AWS-hosted portfolio ecosystem. It showcases cloud engineering, DevOps, and automation capabilities while demonstrating end-to-end deployment through AWS S3 static website hosting.

───────────────────────────────────────────────
��� Project Structure
───────────────────────────────────────────────
File            Purpose
-------------------------------------------------
index.html      Main profile webpage
style.css       Custom styling, layout, and theme
script.js       UI enhancements (fade-in animations)
photo.jpg       Profile picture
README.md       Documentation and deployment guide

───────────────────────────────────────────────
☁️ AWS Deployment Overview
───────────────────────────────────────────────
The webpage is deployed via AWS S3 Static Website Hosting using CLI automation.

───────────────────────────────────────────────
1️⃣ Configure AWS Credentials
───────────────────────────────────────────────
In AWS Console:
  • Go to IAM → Users → Dylane
  • Open Security Credentials
  • Create a new Access Key

Configure AWS CLI:

    aws configure

Enter:
  • AWS Access Key
  • AWS Secret Key
  • Region: us-east-1
  • Output format: json

───────────────────────────────────────────────
2️⃣ Create the S3 Bucket
───────────────────────────────────────────────
In AWS Console:
  • Bucket name: dylane-teamfolio-profile
  • Enable ACLs
  • Disable Block Public Access (all options)
  • Save changes

Ensure:
  • Static Website Hosting is enabled
  • Index document = index.html

───────────────────────────────────────────────
3️⃣ Upload Website Files (Automation Script)
───────────────────────────────────────────────
Use the included upload script to sync all files:

    ./s3.sh

This performs an automated S3 sync and updates the live site instantly.

───────────────────────────────────────────────
4️⃣ Access the Live Static Website
───────────────────────────────────────────────
Find your endpoint at:

  S3 Bucket → Properties → Static Website Hosting

Or open:

    http://dylane-teamfolio-profile.s3-website-us-east-1.amazonaws.com

───────────────────────────────────────────────
��� Live Website
───────────────────────────────────────────────
http://dylane-teamfolio-profile.s3-website-us-east-1.amazonaws.com
