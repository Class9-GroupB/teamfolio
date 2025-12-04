# 📘 Teamfolio Operations Runbook

**System:** Teamfolio Platform  
**Region:** `ca-central-1` (Canada Central)  
**Admin Access:** via AWS Systems Manager (SSM)

---

## 🔄 Standard Operating Procedures (SOPs)

### 1. Deployment Strategy (Manual / Fallback)
Since we use **Immutable Infrastructure**, we do not edit files directly on running servers. We package the code, upload it, and replace the servers.

**Trigger:** GitHub Actions failure or Manual Release requirement.

1.  **Build:**
    *   Locally, delete the `node_modules` folder to keep the artifact clean.
    *   Zip the contents of the `app/` folder into `app-v1.zip` (or increment version to `v2`).
2.  **Ship:**
    *   Upload the zip file to the S3 Artifacts bucket: `teamfolio-artifacts-brandon-nov25`.
    *   *Note: If you change the filename (e.g., to v2), update the Launch Template User Data script to match.*
3.  **Deploy (Instance Refresh):**
    *   Go to **EC2 Console** -> **Auto Scaling Groups**.
    *   Select `Teamfolio-ASG`.
    *   Click **Instance refresh** tab -> **Start instance refresh**.
    *   **Settings:** Set *Minimum healthy percentage* to `50` (Ensures zero downtime).
    *   *Result:* AWS will launch new servers with the updated code and terminate the old ones.

### 2. Server Access & Diagnostics
SSH (Port 22) is disabled for security. All access is managed via **Systems Manager (SSM)**.

**How to Connect:**
1.  Go to **EC2 Console** -> **Instances**.
2.  Select a running instance.
3.  Click **Connect**.
4.  Select the **Session Manager** tab -> Click **Connect**.
5.  *Result:* You will have a secure terminal shell in your browser.

**How to Check Application Logs:**
Once connected via SSM, run the following to check the Node.js process:

```bash
# Switch to root user (User Data runs as root)
sudo su -

# View real-time logs
pm2 logs teamfolio

# Check process status
pm2 status

## 🚨 Incident Response

### Scenario A: High Latency or 5xx Errors
**Trigger:** CloudWatch Alarm `High-5XX-Error` or User Report.

1.  **Check Dashboard:**
    *   Open the **CloudWatch** Console.
    *   View dashboard: `Teamfolio-Ops-Board`.
2.  **Verify Target Health:**
    *   Go to **EC2** -> **Target Groups** -> `Teamfolio-TG`.
    *   Check the **Targets** tab.
3.  **Diagnosis:**
    *   **If Healthy Hosts < 2:** The ASG is failing to launch valid instances. Check User Data logs via SSM (`/var/log/messages`).
    *   **If Hosts are Healthy but 5xx persists:** The Node.js app is crashing internally. Check PM2 logs.

### Scenario B: Traffic Spike (Emergency Scaling)
**Trigger:** CPU Utilization > 80% or slow response times during Demo.

1.  Go to **EC2 Console** -> **Auto Scaling Groups**.
2.  Select `Teamfolio-ASG`.
3.  Click **Edit** under the "Group details" section.
4.  **Increase Capacity:**
    *   Set `Desired Capacity` = **4**
    *   Set `Max Capacity` = **6**
5.  Click **Update**.
    *   *Result:* 2 new instances will launch immediately to handle the load.

---

## 🔐 Security & Maintenance

### 1. Certificate Rotation
*   **Service:** AWS Certificate Manager (ACM).
*   **Scope:** `*.teamfoliosolutions.com`.
*   **Procedure:** AWS manages renewal automatically.
*   **Audit:** Every 6 months, verify status is **"Issued"** in the ACM Console.

### 2. Access Control
*   **EC2 Access:** We use IAM Roles (`Teamfolio-EC2-Role`). No long-term Access Keys are stored on servers.
*   **Human Access:** If a team member leaves, remove their IAM User from the AWS account immediately. No SSH keys need rotation because SSH is disabled.