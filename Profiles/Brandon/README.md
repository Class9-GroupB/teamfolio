# Dark Luxury Portfolio | AWS Cloud Architecture

A high-performance, minimalist personal portfolio website designed for Cloud Engineers and Solutions Architects. This project features a "Dark Mode" aesthetic and is deployed using a serverless AWS architecture for global scalability and low latency.

![Portfolio Preview](https://i.gyazo.com/5a3bd9b5a3cf801f73f8553d20f7a1ce.png)

🔗 **[Live Demo: https://d3msldsb91zfdl.cloudfront.net/#skills](https://d3msldsb91zfdl.cloudfront.net/#skills)**

![AWS S3](https://img.shields.io/badge/AWS-S3-orange)
![AWS CloudFront](https://img.shields.io/badge/AWS-CloudFront-blue)
![Status](https://img.shields.io/badge/Status-Live-success)

## ☁️ Cloud Architecture

This is not just a static site; it is a demonstration of cloud infrastructure fundamentals.

*   **Storage (S3):** The static assets (`index.html`, `style.css`, JS, images) are stored in an AWS S3 bucket configured for static website hosting in the `ca-central-1` region.
*   **Content Delivery Network (CloudFront):** An AWS CloudFront distribution sits in front of the S3 bucket.
    *   **Benefits:** This enforces HTTPS (TLS) security, caches content at Edge Locations globally for millisecond-latency loading, and reduces direct traffic costs to the S3 origin.
*   **Access Control:** The S3 bucket policy is configured for public read access (`s3:GetObject`), while CloudFront is configured to handle the HTTP-to-HTTPS redirects.

## 🌟 Key Features

*   **Aesthetic:** "Midnight Black" theme with high-contrast white typography and metallic gold accents.
*   **Performance:** Lightweight, dependency-free code served via CDN.
*   **Interactive UI:** Custom trailing cursor logic and scroll-triggered "reveal" animations.
*   **Glassmorphism:** Navbar blur effects that react to scrolling.
*   **Skills Matrix:** Structured grid layout displaying Cloud/DevOps competencies.

## 🛠 Tech Stack

*   **Infrastructure:** AWS S3, AWS CloudFront.
*   **Frontend:** HTML5, CSS3 (Variables, Flexbox, Grid), Vanilla JavaScript (ES6+).
*   **Fonts:** [Montserrat](https://fonts.google.com/specimen/Montserrat) & [Playfair Display](https://fonts.google.com/specimen/Playfair+Display).
*   **Icons:** [FontAwesome 6](https://fontawesome.com/).

## 📂 File Structure

```bash
/project-root
│
├── index.html      # Main HTML structure
├── style.css       # Visual styling & Animations
├── script.js       # Cursor logic, Scroll events, Navbar effects
├── photo.jpg       # Portfolio screenshot / Profile image
└── README.md       # Project documentation
```
## 🚀 Deployment Instructions

This project is deployed using the AWS CLI to ensure fast and consistent updates.

### 1. Prerequisite: Configure AWS CLI
Ensure your terminal has access to your AWS credentials:
```bash
aws configure
```
## 2. Navigate to Directory
```bash
cd profiles/brandon
```
## 3. Sync Files to S3
Upload the project files to your S3 bucket. The --delete flag removes old files that are no longer in your local folder.

```bash 
aws s3 sync . s3://your-bucket-name --delete
```

## 4. Invalidate CloudFront Cache
To ensure users see the latest version immediately (instead of the cached version), invalidate the distribution:

```bash 
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```


## 📬 Contact

# LinkedIn: Brandon Randell
# GitHub: BrandoMan1

## © 2025 Brandon Randell. Architected on AWS.