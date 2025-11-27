#!/bin/bash
# ------------------------------------------------------------------
# Teamfolio User Data Bootstrap Script
# OS: Amazon Linux 2023
# Purpose: Install Node.js, pull artifact from S3, and start app.
# ------------------------------------------------------------------

# 1. Update OS and Install Prerequisites
yum update -y
yum install -y nodejs npm aws-cli unzip wget

# 2. Setup Application Directory
mkdir -p /home/ec2-user/app
cd /home/ec2-user/app

# ------------------------------------------------------------------
# 3. Download Artifact from S3 (Immutable Deployment)
# ------------------------------------------------------------------
aws s3 cp s3://teamfolio-artifacts-brandon-nov25/app-v1.zip app.zip

# 4. Unzip and Install Dependencies
unzip app.zip
npm install

# 5. Start Application using PM2 (Process Manager)
# This keeps the app running in the background and restarts it if it crashes
npm install -g pm2
pm2 start server.js --name "teamfolio"

# 6. Ensure App Starts on Server Reboot
pm2 startup systemd | bash
pm2 save