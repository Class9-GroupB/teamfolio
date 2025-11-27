# 🏗 Teamfolio System Architecture

## High-Level Overview
Teamfolio utilizes a **Hybrid Architecture** combining mutable compute resources for the dynamic team application and serverless distribution for individual static portfolios.

## diagram
![Teamfolio Hybrid Architecture](docs/architecture-diagram.png)

## Key Design Decisions (ADR)

### 1. Compute Strategy: EC2 + Auto Scaling
*   **Decision:** Use EC2 `t3.micro` instances managed by an Auto Scaling Group.
*   **Justification:** Meets the requirement for horizontal scaling and "Zero manual server changes." Instances are treated as ephemeral (cattle, not pets).

### 2. Traffic Management: ALB + Route 53
*   **Decision:** Application Load Balancer performing SSL termination (HTTPS).
*   **Justification:** ALB supports Layer 7 routing and path-based health checks (`/healthz`), essential for detecting application failures before traffic is sent.

### 3. Hybrid Static Content
*   **Decision:** Individual portfolios hosted on S3 + CloudFront.
*   **Justification:** 
    *   **Cost:** Significantly cheaper than running web servers for static HTML.
    *   **Performance:** CloudFront caches content at the edge (low latency).
    *   **Security:** S3 Origin Access Control (OAC) ensures buckets are not public.

### 4. Security Posture
*   **No SSH:** Port 22 is blocked. Administration is performed via AWS Systems Manager (SSM).
*   **Private-ish Subnets:** Application servers reside in subnets protected by Security Groups allowing ingress ONLY from the ALB Security Group.