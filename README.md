# 🌐 Teamfolio — Team4Tech AWS Cloud Deployment Project

Welcome to **Teamfolio**, our Team4Tech group project!  
We’re building a simple **scalable web application on AWS** that showcases our team and individual profiles.

**Live website at:** [teamfoliosolutions.com](https://teamfoliosolutions.com/)

**Confluence:** https://brandoman.atlassian.net/wiki/spaces/TF/overview?homepageId=28049678

**Jira:** https://brandonrandell8.atlassian.net/jira/software/projects/AWS/summary

---

## 🎯 Project Overview

**Goal:**  
Deploy a team website on AWS that:
- Runs behind an **Application Load Balancer (ALB)** with **Auto Scaling**  
- Serves traffic securely over **HTTPS (ACM + Route 53)**  
- Shows a **team homepage** and **individual member profile pages**  
- Stays available even if one server fails  

This is our **minimum viable product (MVP)** — simple, stable, and easy to maintain.

---

## 🧱 Architecture (MVP Scope)

User → ALB (HTTPS) → Target Group → EC2 Auto Scaling Group → Nginx / App  
(Optionally S3 + CloudFront for static member profiles)

**AWS Services Used**
- EC2 (Auto Scaling, Launch Template)
- Application Load Balancer (ALB)
- Route 53 (DNS + Domain/Subdomain)
- ACM (SSL Certificate)
- S3 + CloudFront
- CloudWatch (basic monitoring)
- IAM, SNS, and SSM

---

## 🧩 Repo Structure

```
teamfolio/
├── app/               # Frontend or Node app for the main team site
│   ├── index.html
│   └── assets/
├── profiles/          # Individual member pages (static)
│   ├── member1/
│   ├── member2/
│   └── ...
├── infra/             # AWS setup (manual or IaC later)
│   ├── vpc/
│   ├── alb/
│   ├── asg/
│   └── route53/
├── .github/workflows/ # Optional CI/CD pipeline
└── README.md
```

---

## 🚀 Quick Start (For Teammates)

1. **Clone the repo**
   ```
   git clone https://github.com/<org-name>/teamfolio.git
   cd teamfolio
   ```

2. **Run locally**
   - Open `app/index.html` in a browser  
   - (Optional) start a local Node/Express app if added

3. **Deploy manually**
   - Launch an **EC2** instance (Ubuntu)
   - Add **User Data** to install Nginx and serve `/app`
   - Verify the page loads via the EC2 public IP

4. **Document progress**
   - Add screenshots & notes in **Confluence**
   - Update tasks in **Jira**

---

## 📆 Timeline (4 Weeks)

| Week | Focus | Deliverables |
|------|--------|--------------|
| **Week 1** | Setup & planning | VPC + EC2 + basic website |
| **Week 2** | ALB + HTTPS + Scaling | ALB, ACM, Auto Scaling Group |
| **Week 3** | Monitoring + Profiles | CloudWatch + S3/CloudFront profiles |
| **Week 4** | Demo + Wrap-up | Load test, docs, presentation |

---

## 👥 Team Roles

| Role | Name | Main Tasks |
|------|------|------------|
| **Infra Lead** | TBD | VPC, EC2, ALB, ASG |
| **App Lead** | TBD | Build website & member pages |
| **Deployment Lead** | TBD | User Data & deploy steps |
| **Docs Lead** | TBD | Confluence + Jira |
| **Tester** | TBD | Load tests & verification |

---

## 🧠 Learning Outcomes

- Deploying scalable apps on AWS  
- Using EC2, ALB, Auto Scaling, Route 53, and ACM  
- Working with GitHub, Jira, and Confluence  
- Basic monitoring and resilience testing  

---

## 📎 References

- AWS EC2 Docs  
- AWS ALB Docs  
- Route 53 Docs  
- ACM Docs  

---

<<<<<<< HEAD
**Deadline:** December 11th, 2025  
**Team:** Team4Tech  
=======
**Deadline:** December 4, 2025  
**Team:** Team4Tech  
>>>>>>> 4d003f5eb19fe7c3a94531e764e29dd517c04778
