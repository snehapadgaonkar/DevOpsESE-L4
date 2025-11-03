# DevOpsESE-L4
ESE project repo need to upload

Name: Sneha Padgaonkar \
PRN: 22070122213 

# Task 8: Autoscaling deployment (app: iot-sensor-api)
- **Repository:** `ks8-autoscale-demo`  
- **Objective:**  
  Deploy `iot-sensor-api` app with resource limits and configure Horizontal Pod Autoscaler.  

- **Configuration:**  
  - Minimum Pods: `1`  
  - Maximum Pods: `5`  
  - Target CPU Utilization: `50%`  

- **Steps:**  
  1. Deploy the application with defined resource limits.  
  2. Configure the Horizontal Pod Autoscaler (HPA).  
  3. Generate load on the application.  
  4. Observe scaling behavior.

- **Expected Output:**  
  ✅ Pods scale automatically under load.
