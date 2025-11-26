🌐 Personal Cloud Profile — Hosted on AWS S3
This is my standalone static portfolio website, built as part of the Team4Tech / Teamfolio cloud deployment project.
It showcases my background, skills, projects, and contact information, and is fully hosted on Amazon S3 using Static Website Hosting.

🚀 Live Website
➡️ http://bildad-teamfolio-profile.s3-website.ca-central-1.amazonaws.com/

🧾 Project Overview
This is a simple, lightweight, responsive personal profile page designed to be deployed on AWS as part of the individual deliverables for the Teamfolio project.

It includes:

✨ Clean, modern, white UI
👤 Name, photo, and short bio
💼 Skills matrix (Cloud, DevOps, Programming)
🧩 Featured projects with descriptions
🔗 GitHub, LinkedIn, and email links
🌍 Static hosting on AWS S3
🔒 Optional: CloudFront CDN + HTTPS (ACM)
The goal was to build something that is easy to maintain, fast to load, and simple for classmates and instructors to review.

🛠️ Built With
HTML5 (fully static, no framework needed)
AWS S3 Static Website Hosting
Optional integrations:
CloudFront for global CDN delivery
Route 53 for custom domain
ACM for HTTPS certificates
📦 File Structure
/
│── index.html        # Main personal profile page
│── profile.jpg       # My profile picture
└── README.md
🌱 How It Works (S3 Deployment Summary)
Created an S3 bucket (public access allowed for website hosting)
Enabled Static Website Hosting (index document = index.html)
Uploaded:
index.html
profile.jpg
Added a bucket policy to allow public GET access
Accessed the site via the S3 Website Endpoint
This keeps the site:

Serverless
Cheap
Easy to update (just upload new files)
