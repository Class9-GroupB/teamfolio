# 📝 Incident Post-Mortem: Game Day Simulation

**Date:** November 26, 2025
**Incident Status:** Resolved
**Severity:** SEV-1 (Critical)
**Lead:** Brandon

## 🚨 Incident Summary
During a scheduled "Game Day" resilience test, traffic to `teamfoliosolutions.com` experienced elevated latency and 5xx errors due to a simulated failure of the application layer. Specifically, we simulated a **Network Partition** by modifying Security Groups, followed by an **Instance Termination** to test auto-healing.

## 📉 Impact
*   **Service:** Teamfolio Public Website
*   **Duration:** 5 minutes
*   **User Impact:** Users experienced `504 Gateway Timeout` errors during the Security Group simulation. Users experienced no downtime during the Instance Termination test (ALB successfully routed to the survivor).

## 🕵️‍♂️ Root Cause Analysis (5 Whys)
1.  **Why did the site fail?** The Load Balancer could not reach the EC2 instances.
2.  **Why?** The Security Group `Teamfolio-App-SG` was modified to remove Inbound Rule for Port 3000.
3.  **Why?** This was a planned chaos engineering test (Game Day).

## ⏱ Timeline
*   **18:00 EST:** Started baseline load test (100 RPS). Site healthy.
*   **18:05 EST:** **[Injection]** Removed Inbound Rule from App Security Group.
*   **18:06 EST:** **[Detection]** CloudWatch Alarm `Teamfolio-5XX-High` fired. Dashboard showed 504 errors spiking.
*   **18:08 EST:** **[Resolution]** Reverted Security Group changes.
*   **18:10 EST:** **[Injection]** Terminated Instance `i-0abcd1234` manually.
*   **18:12 EST:** Auto Scaling Group detected unhealthy host and launched replacement `i-0xyz9876`.
*   **18:15 EST:** Cluster back to full capacity (2/2 Healthy).

## 📊 Observability Evidence
*(Insert your CloudWatch Screenshots here)*
*   *Screenshot 1: The spike in `HTTPCode_Target_5XX_Count`*
*   *Screenshot 2: The drop and recovery of `HealthyHostCount`*

## 🧠 Lessons Learned & Action Items
*   **What went well:** The Application Load Balancer successfully shielded users from the instance termination. The surviving instance handled the traffic load without crashing.
*   **What needs improvement:** The 5xx Alarm took about 2 minutes to trigger email notification.
*   **Action Item:** Tune CloudWatch Alarm period from `5 minutes` down to `1 minute` for faster detection.
