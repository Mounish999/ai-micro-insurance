# PulseSure – Parametric Insurance for Gig Workers

---

## Problem

India’s gig economy depends heavily on delivery partners working for platforms such as Swiggy, Zomato, Zepto, and Amazon. These workers earn on a daily basis and lack any form of income stability.

External disruptions such as heavy rainfall, extreme heat, high pollution levels, and local restrictions directly affect their ability to work. As a result, a worker earning around ₹700 per day can lose their entire income for the day due to circumstances beyond their control.

Existing insurance systems are not designed to handle short-term, real-time income loss. There is currently no effective mechanism to protect gig workers from sudden disruptions in daily earnings.

---

## Solution

**PulseSure** is an AI-driven parametric insurance platform that provides real-time income protection for gig workers.

The system continuously monitors environmental conditions and worker activity. When predefined disruption conditions are met, compensation is automatically triggered without requiring manual claims.

**PulseSure** functions as a real-time financial safety net, ensuring gig workers are protected even during unpredictable disruptions.

---

## Target Persona

The platform is designed for gig delivery workers operating on platforms such as **Swiggy, Zomato, Zepto, and Amazon**.

---

## Example Persona

**Akshay – Delivery Partner (Hyderabad)**  
- Daily earnings: ₹700  
- Works long hours to maximize income  

During heavy rainfall, delivery demand drops significantly, resulting in immediate income loss.

**PulseSure** ensures that workers like Rahul receive compensation when such disruptions occur.

---

## Weekly Insurance Plans

Gig workers typically operate on short earning cycles. **PulseSure** offers flexible weekly plans:

- **Basic Plan – ₹10/week → Covers ₹300/day**  
- **Pro Plan – ₹20/week → Covers ₹500/day**  
- **Premium Plan – ₹30/week → Covers ₹700/day**

This pricing model ensures affordability while providing meaningful coverage.

---

## Parametric Disruption Triggers

The platform uses predefined thresholds to automatically detect disruptions:

- Rainfall greater than 80 mm  
- Temperature greater than 45°C  
- Air Quality Index above 350  
- Local curfew or delivery zone shutdown  

When any of these conditions are met, the system automatically activates a claim and initiates payout.

---

## AI Integration

### Risk Assessment

The system analyzes environmental data, historical trends, and geographic risk patterns to dynamically determine risk levels and pricing.

Workers in lower-risk areas benefit from lower premiums, while higher-risk zones are priced accordingly.

---

### Fraud Detection

**PulseSure** identifies suspicious activity using multiple signals:

- GPS inconsistencies  
- Duplicate or repeated claims  
- Weather-data mismatches  
- Abnormal activity patterns  

This ensures that only genuine claims are processed and the system remains sustainable.

---

## System Workflow

1. Worker registers on the platform  
2. Selects an insurance plan  
3. Risk is evaluated and policy is activated  
4. System continuously monitors conditions  
5. Disruption is detected  
6. Claim is automatically triggered  
7. Compensation is credited to the worker  

---

## Technology Stack

- **Frontend:** React  
- **Backend:** Spring Boot (Java)  
- **Database:** MySQL (Workbench)  
- **AI Logic:** Rule-based scoring engine implemented in Spring Boot  
- **APIs:** Weather API, AQI API  
- **Payments:** Razorpay (test integration)

---

## System Architecture

---

## Smart Earnings Protection

In addition to environmental triggers, **PulseSure** introduces earnings-based disruption detection.

The system monitors delivery activity and identifies sudden drops in order volume that may indicate disruptions such as platform outages, unexpected demand drops, or operational issues.

### Example Scenario

- Normal daily orders: 25  
- Orders on a disrupted day: 5  

If a significant deviation from the worker’s normal activity is detected, the system flags it as a disruption and triggers compensation.

### How It Works

- Historical delivery data is analyzed  
- Normal earning patterns are established  
- Sudden deviations are detected  
- Claims are automatically triggered  

This ensures protection against both environmental and demand-side disruptions.

---

## Market Crash Scenario

A coordinated fraud attack involving multiple fake delivery accounts can exploit the system by submitting false claims using manipulated GPS data.

Such attacks can lead to large-scale financial losses and threaten platform stability.

---

## Adversarial Defense and Anti-Spoofing Strategy

### Multi-Layer Fraud Detection

**PulseSure** uses a multi-layer validation approach rather than relying solely on GPS data.

---

### Location Intelligence

The system detects unrealistic movement patterns such as sudden location jumps and verifies route continuity to ensure alignment with real-world movement.

---

### Behavioral Analysis

The platform identifies suspicious patterns such as:

- Excessive claims within short time intervals  
- Identical behavior across multiple accounts  
- Lack of natural variation in activity  

---

### Device Fingerprinting

The system detects:

- Multiple accounts linked to a single device  
- Emulator-based activity  
- Unusual login patterns  

---

### Environment Cross-Verification

Each claim is validated against external data sources:

- Rainfall claims are checked against weather APIs  
- Pollution claims are verified using AQI data  

---

### AI-Based Risk Scoring

Each user is assigned a risk score based on behavior, location consistency, and device signals. This score is used to evaluate claim legitimacy.

---

### Fairness Mechanism

To protect genuine users:

- Low-risk users receive full payouts  
- Medium-risk users may undergo additional verification  
- High-risk users are flagged for review  

---

### Fraud Ring Detection

The system analyzes clusters of users to detect coordinated fraud attempts based on shared behavior, timing, and location patterns.

---

## Impact

- Provides financial stability to gig workers  
- Reduces vulnerability to income disruptions  
- Builds trust within platform ecosystems  
- Minimizes fraud-related losses  
- Scales effectively across large user bases  

---

## Future Scope

- Integration with major gig platforms  
- Expansion across multiple regions  
- Advanced predictive analytics  
- Real-time monitoring dashboards  

---

## Conclusion

**PulseSure** combines parametric insurance with intelligent risk assessment and fraud-resistant architecture to deliver real-time income protection.

By addressing both environmental disruptions and coordinated fraud risks, the platform ensures scalability, reliability, and trust in the gig economy.
