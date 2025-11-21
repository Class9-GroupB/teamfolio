🧑‍💻 Divina David – Cloud & DevOps Profile Page

Part of the Team4Tech – Teamfolio AWS Deployment Project

This repository contains the individual profile webpage for Divina David, deployed as part of a collaborative AWS-hosted portfolio system. The page highlights cloud, DevOps, and automation skills while demonstrating end-to-end deployment using AWS S3 static website hosting.

📁 Project Structure
File	    Purpose
index.html	Main portfolio webpage
style.css	Custom styling, layout, and color theme
script.js	UI enhancements such as fade-in animations
photo.jpg	Profile picture for the page
README.md	Documentation for setup and deployment


🌐 Local Development & Preview

To preview the website locally, run a simple Python web server:

python -m http.server 8000

Then open your browser:
    http://localhost:8000/

This allows you to verify layout, styling, and functionality before deploying.

☁️ AWS Deployment Steps

The webpage is deployed using AWS S3 static website hosting.

1️⃣ Configure AWS Credentials

In AWS Console:
    Go to IAM → Users → Divina
    Open Security Credentials
    Create a new Access Key

Configure AWS CLI: aws configure

Enter:
    AWS Access Key
    AWS Secret Key
    Region: ca-central-1
    Output format: json

2️⃣ Create an S3 Bucket

In AWS Console:

Bucket name: divina-teamfolio-profile

    Enable ACLs
    Disable Block Public Access (all options)
    Save changes

3️⃣ Upload Website Files (Automation Script)

Use the upload script:

    ./s3.sh

This syncs all files to the S3 bucket automatically.

4️⃣ Access the Static Website

Go to:

S3 Bucket → Properties → Static Website Hosting → Endpoint

    
🚀 Live Website

http://divina-teamfolio-profile.s3-website.ca-central-1.amazonaws.com