# 🛡 Sentinel: Real-Time Transaction Risk & Fraud Monitoring Platform

> Enterprise-grade full-stack fraud detection system powered by **Next.js 16**, **Node.js / Express**, **PostgreSQL**, **Prisma ORM**, and **Socket.IO**. Sentinel evaluates banking transactions against multi-factor risk heuristics in real-time, automates case investigations, and streams live fraud alerts.

---

## ⚡ Key Highlights & Architecture

```mermaid
graph TD
    subgraph Client ["Frontend (Next.js 16 + React 19)"]
        UI[Security Operations Dashboard]
        AuthGuard[Zustand Auth Store & RBAC Guard]
        LiveListener[Socket.IO Alert Listener & Auto-Refresh]
        SimPanel[Multi-Mode Traffic Simulator]
        CaseSheet[Interactive Case Investigation Sheet]
    end

    subgraph Server ["Backend (Express + TypeScript + Socket.IO)"]
        Auth[JWT Authentication & RBAC Middleware]
        RiskEngine[Transaction Risk Engine]
        CaseService[Automated Case Management]
        AuditService[Complete Regulatory Audit Trail]
        SocketHub[Socket.IO Real-Time Broadcast Hub]
    end

    subgraph Data ["Database (PostgreSQL + Prisma)"]
        DB_Users[(Users & Roles)]
        DB_Tx[(Transactions)]
        DB_Cases[(Fraud Cases)]
        DB_Audit[(Audit Logs)]
    end

    UI -->|REST APIs with Bearer JWT| Auth
    AuthGuard --> UI
    RiskEngine --> CaseService
    CaseService --> AuditService
    Server -->|Prisma Client| Data
    SocketHub <==>|Bi-directional WebSockets| LiveListener
    SimPanel -->|Stream Injection| RiskEngine
```

---

## 🚀 Features

### 1. Multi-Factor Transaction Risk Engine
Evaluates every transaction against dynamic rule heuristics:
* **High-Value Anomaly**: Flags transactions exceeding ₹50,000 INR (+30 Risk Score).
* **Geographic Anomaly**: Flags cross-border/international IP transactions outside domestic baseline (+25 Risk Score).
* **Suspicious/Unregistered Merchants**: Flags merchants not in vetted whitelist (+20 Risk Score).
* **High-Risk Channel (ATM)**: Cash-out withdrawal detection (+15 Risk Score).
* **Automated Triage**:
  * Score $\ge 80$: **CONFIRMED_FRAUD** (Instant critical alert broadcast + Auto-creates High Priority Case).
  * Score $40 - 79$: **FLAGGED** (Auto-creates Medium Priority Case for review).
  * Score $< 40$: **SAFE** (Approved and logged).

### 2. Role-Based Access Control (RBAC)
Strictly enforced across both backend Express middleware (`authorizeRole`) and frontend Next.js UI:
| Capability | ADMIN | ANALYST | VIEWER |
| :--- | :---: | :---: | :---: |
| **Telemetry & Dashboard** | ✅ Allowed | ✅ Allowed | ✅ Allowed |
| **Transaction Monitoring** | ✅ Allowed | ✅ Allowed | ✅ Allowed |
| **Manual Transaction Injection** | ✅ Allowed | ✅ Allowed | ❌ Read-Only |
| **Case Investigation & Resolution** | ✅ Allowed | ✅ Allowed | ❌ Read-Only |
| **Regulatory Audit Trail** | ✅ Allowed | ✅ Allowed | ❌ Restricted |
| **Traffic Simulation Engine** | ✅ Admin Only | ❌ Restricted | ❌ Restricted |

### 3. Real-Time Telemetry & WebSocket Streaming
* Live broadcast of `transaction-created` and `fraud-alert` events via **Socket.IO**.
* Instant high-risk toast notifications with merchant, amount, and country details.
* Automated cache invalidation via TanStack Query (no manual refresh needed).

### 4. Interactive Case Investigation & Resolution
* Slide-over investigation sheet on `/cases` for detailed forensic review.
* One-click **"Assign to Me"** and **"Mark Resolved"** workflow with instant audit trail logging.

### 5. Multi-Mode Traffic Simulation Engine
Injects simulated banking transactions live into the risk engine:
* 🟢 **Normal Banking Traffic**: Typical domestic UPI and card transactions.
* 🟡 **Mixed Traffic**: Blend of everyday transactions with occasional anomalies.
* 🔴 **Fraud Attack**: High-velocity high-value international attacks to test system resilience.

---

## 🔑 Demo Login Credentials

For quick evaluation, pre-seeded accounts are available:

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@sentinel.com` | `admin123` | Full access + Simulation control |
| **Analyst** | `analyst@sentinel.com` | `analyst123` | Manual transactions + Case triage |
| **Viewer** | `viewer@sentinel.com` | `viewer123` | Read-only telemetry access |

*(You can also use the one-click demo buttons on the `/login` page).*

---

## 💻 Local Setup & Development

### Prerequisites
* Node.js 18+
* PostgreSQL instance running locally or on cloud

### 1. Backend Setup
```bash
cd backend
npm install

# Configure environment variables (.env)
# DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/fraud_platform"
# JWT_SECRET="your-super-secret-jwt-key"
# PORT=5000
# FRONTEND_URL="http://localhost:3000"

# Push schema and seed database
npx prisma db push
npm run seed

# Start development server
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install

# Start Next.js development server
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🌐 Production Deployment Guide

### Architecture for Cloud
* **Frontend**: Deploy on [Vercel](https://vercel.com) (Serverless Next.js).
* **Backend**: Deploy on [Render](https://render.com) or [Railway](https://railway.app) (Requires a persistent container for Socket.IO WebSockets).
* **Database**: Managed PostgreSQL on [Neon.tech](https://neon.tech) or [Supabase](https://supabase.com).

### Deployment Steps:
1. **Database**: Create a free PostgreSQL instance on Neon or Supabase and copy the connection string.
2. **Backend (Render / Railway)**:
   * Build Command: `npm install && npx prisma generate && npm run build`
   * Start Command: `npm start`
   * Environment Variables:
     * `DATABASE_URL`: Your Neon/Supabase PostgreSQL connection string
     * `JWT_SECRET`: Random 64-character secret
     * `PORT`: `5000` (or `PORT` provided by platform)
     * `FRONTEND_URL`: Your deployed Vercel domain (e.g. `https://sentinel-fraud.vercel.app`)
3. **Frontend (Vercel)**:
   * Framework Preset: Next.js
   * Root Directory: `frontend`
   * Environment Variables:
     * `NEXT_PUBLIC_API_URL`: Your deployed backend URL + `/api` (e.g. `https://sentinel-api.onrender.com/api`)
     * `NEXT_PUBLIC_SOCKET_URL`: Your deployed backend URL (e.g. `https://sentinel-api.onrender.com`)

---

## 📄 Resume Project Overview (Ready for Resume)

```text
Sentinel | Next.js, Node.js, Express, PostgreSQL, Prisma, Socket.IO, TypeScript
Real-Time Transaction Risk & Fraud Monitoring Platform
• Built a full-stack real-time fraud monitoring platform with secure JWT authentication, role-based access control (Admin, Analyst, Viewer), and live transaction streaming using Socket.IO.
• Developed a multi-factor transaction risk engine evaluating banking activity against high-value thresholds, geographic anomalies, ATM cash-outs, and merchant whitelists to auto-flag suspicious activity and generate investigation cases.
• Designed REST APIs with Express, Prisma, and PostgreSQL supporting search, multi-field filtering, pagination, and strict role-based authorization for transactions, cases, analytics, and audit logs.
• Implemented live telemetry dashboard updates, instant high-risk alert toasts, interactive case triage workflows, and a multi-mode banking traffic simulation engine (Normal, Mixed, Fraud Attack) to test risk models under load.
```
