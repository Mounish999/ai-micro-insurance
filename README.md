# PulseSure — Context-Aware Micro Insurance for Gig Workers

## Overview

PulseSure is a lightweight, AI-assisted micro-insurance prototype designed for gig workers who face daily income uncertainty.

Instead of traditional fixed insurance plans, PulseSure adapts to real-world conditions such as weather, air quality, and demand fluctuations. The system calculates weekly premiums dynamically and uses predefined triggers to automatically initiate payouts when risk conditions are met.

This project is built as a hackathon MVP, focusing on solving a real problem with a practical and scalable approach.

---

## Problem Statement

Gig workers depend heavily on external conditions that directly affect their income. Factors like heavy rain, high pollution, or sudden drops in demand can significantly reduce their earnings.

However, existing insurance systems:
- Do not adapt to daily working conditions
- Require manual claim processes
- Are not affordable or flexible for short-term needs

There is a need for a system that provides fast, fair, and condition-based financial protection.

---

## Proposed Solution

PulseSure introduces a parametric micro-insurance model where:

- Premiums are calculated dynamically on a weekly basis
- Real-world data is used to assess risk
- Claims are automatically triggered based on predefined conditions

This removes the need for manual claims and ensures faster compensation.

---

## Key Features

- Dynamic premium calculation based on environmental and demand data
- Trigger-based automatic payouts
- Mobile-first design for accessibility
- Simple and fast onboarding process

---

## How It Works

1. The user logs into the application
2. The system collects real-time data such as:
   - Weather conditions
   - Air Quality Index (AQI)
   - Local demand patterns
3. A risk score is calculated
4. Based on this score, a weekly premium is generated
5. If predefined conditions are met (e.g., heavy rainfall or low demand), the system automatically initiates a payout

---

## Innovation

The core innovation of this project lies in:

- Moving from claim-based insurance to trigger-based insurance
- Using real-time contextual data instead of static pricing
- Designing for short-term, flexible coverage cycles

---

## Technology Stack

- Frontend: React / React Native
- Backend: Spring Boot
- Database: PostgreSQL
- AI/ML: Python (Scikit-learn)
- External APIs: Weather and AQI data APIs

---

## MVP Scope (Phase 1)

In this phase, we focus on building a working prototype with:

- Basic user login functionality
- Integration with a weather API
- Simple rule-based premium calculation
- Simulation of trigger-based payouts

---

## Future Scope

- Advanced AI-based risk prediction
- Real-time demand forecasting
- Automated payout integration
- Fraud detection mechanisms
- Integration with gig platforms

---

## Deployment

For this prototype, we use simple and fast deployment platforms:

- Backend is deployed using Render or Railway
- Frontend is deployed using Vercel or Netlify

This allows quick testing and demonstration without complex infrastructure.

---

## Conclusion

PulseSure demonstrates how insurance can be made more adaptive, accessible, and efficient for gig workers by leveraging real-time data and automation.

The approach is scalable and can be extended to support millions of workers across different regions and sectors.