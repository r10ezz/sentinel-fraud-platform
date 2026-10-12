# 🛡️ Sentinel — Real-Time Fraud & Risk Intelligence Platform

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=socketdotio&logoColor=white)](https://socket.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Zustand](https://img.shields.io/badge/Zustand-443E38?style=flat-square&logo=react&logoColor=white)](https://github.com/pmndrs/zustand)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white)](https://zod.dev/)

<p align="center">
  <b>A real-time financial fraud detection platform that evaluates banking transactions with multi-factor risk heuristics, triggers instant WebSocket alerts, and automates investigation workflows.</b>
</p>

<p align="center">
  <a href="https://sentinel-fraud-platform.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Platform-Visit%20Sentinel%20%E2%86%92-0070F3?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
</p>

</div>

---

## 🧭 Architecture

```mermaid
graph TD
    Client["Frontend Client (Next.js 16 + React 19)"]
    API["API Server (Node.js + Express + TypeScript)"]
    RiskEngine["Fraud Risk Engine"]
    SocketHub["Socket.IO Server"]
    DB[("PostgreSQL Ledger (Prisma ORM)")]

    Client -->|"REST APIs (JWT Bearer)"| API
    Client <-->|"Bi-directional WebSockets"| SocketHub
    API -->|"Heuristic Evaluation"| RiskEngine
    RiskEngine -->|"Trigger Alert Events"| SocketHub
    API -->|"Persist Data"| DB
```

---

## ⚡ Key Capabilities

* **Real-Time Risk Scoring Engine**: Evaluates transactions instantly using multi-factor heuristics (amount threshold, foreign geolocations, ATM channels, and merchant whitelists).
* **Automated Case Generation**: High-risk activity ($\ge 40$ risk points) automatically generates investigation cases and triggers real-time alerts.
* **Live WebSocket Telemetry**: Socket.IO streams `transaction-created` and `fraud-alert` events straight to the dashboard with instant toast notifications.
* **Role-Based Access Control (RBAC)**: Enforced across Express middleware and Next.js views for **Admin**, **Analyst**, and **Viewer** roles.
* **Interactive Case Management**: Slide-over investigation sheet allows analysts to inspect transactions, assign cases, and mark them resolved.
* **Traffic Simulation Engine**: Injects realistic banking traffic (Normal, Mixed, or Fraud Attack) to test detection models under load.
* **Immutable Audit Trail**: Logs critical system events (logins, transaction flags, case assignments, resolutions) for compliance.

---

## 📊 Risk Engine Heuristics

Every transaction is scored from `0` to `100` based on dynamic risk rules:

| Rule | Condition | Risk Score | Severity |
| :--- | :--- | :---: | :---: |
| **High Amount** | Transaction $> ₹50,000$ | `+30` | High |
| **Geographic Anomaly** | Country outside domestic baseline (`India`) | `+25` | Medium |
| **Unknown Merchant** | Not listed in trusted merchant whitelist | `+20` | Medium |
| **ATM Withdrawal** | Cash-out transaction channel | `+15` | Low |

### Classification Tiers
* 🟢 **SAFE (`0 – 39`)**: Transaction approved and logged in the ledger.
* 🟡 **FLAGGED (`40 – 79`)**: Flagged for analyst investigation; creates medium-priority case.
* 🔴 **CONFIRMED FRAUD (`80 – 100`)**: Broadcasts instant alert; generates high-priority case.

---

## 🔐 Role-Based Access Control (RBAC)

| Feature / Action | Admin | Analyst | Viewer |
| :--- | :---: | :---: | :---: |
| **View Dashboard & Telemetry** | ✅ | ✅ | ✅ |
| **View Transactions & Risk Scores** | ✅ | ✅ | ✅ |
| **Inject Manual Transactions** | ✅ | ✅ | ❌ Read-Only |
| **Assign & Resolve Cases** | ✅ | ✅ | ❌ Read-Only |
| **View Audit Trail** | ✅ | ✅ | ❌ Restricted |
| **Execute Traffic Simulation** | ✅ Admin Only | ❌ Restricted | ❌ Restricted |

---

## 📡 API Overview

| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Public | Authenticates credentials and returns JWT token |
| `GET` | `/api/auth/me` | Authenticated | Fetches current user profile and role |
| `GET` | `/api/transactions` | Authenticated | Fetches transactions with search, filters & pagination |
| `POST` | `/api/transactions` | Admin, Analyst | Ingests transaction and evaluates fraud risk |
| `GET` | `/api/cases` | Authenticated | Lists open and active investigation cases |
| `PATCH` | `/api/cases/:id/assign` | Admin, Analyst | Assigns case to an analyst for triage |
| `PATCH` | `/api/cases/:id/resolve` | Admin, Analyst | Resolves case and records audit log |
| `GET` | `/api/dashboard` | Authenticated | Fetches live metrics and recent activity |
| `GET` | `/api/analytics` | Authenticated | Aggregated fraud volume and geographic trends |
| `GET` | `/api/audit-logs` | Admin, Analyst | Fetches immutable system audit logs |
| `POST` | `/api/simulation/start` | Admin | Initiates automated banking traffic simulation |

---

## 👥 Live Demo & Credentials

🌐 **Live Application**: [https://sentinel-fraud-platform.vercel.app](https://sentinel-fraud-platform.vercel.app/)

Pre-seeded accounts are available for instant evaluation:

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@sentinel.com` | `admin123` | Full access + simulation engine |
| **Analyst** | `analyst@sentinel.com` | `analyst123` | Transaction creation + case triage |
| **Viewer** | `viewer@sentinel.com` | `viewer123` | Read-only telemetry access |

*(Quick-fill demo buttons are also built into the login page).*

---

## 💻 Quick Start (Local Setup)

### 1. Prerequisites
* Node.js 18+
* PostgreSQL running locally or in cloud (Neon / Supabase)

### 2. Backend Setup
```bash
cd backend
npm install
```

Configure `backend/.env`:
```env
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/fraud_platform"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5000
FRONTEND_URL="http://localhost:3000"
```

Initialize database & seed data:
```bash
npx prisma db push
npm run seed
npm run dev
```
> Backend runs at **http://localhost:5000**

### 3. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
```

Configure `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

Start development server:
```bash
npm run dev
```
> Frontend runs at **http://localhost:3000**

---

## ☁️ Deployment

* **Frontend**: Deploy on [Vercel](https://vercel.com) (Root directory: `frontend`).
* **Backend**: Deploy on [Render](https://render.com) or [Railway](https://railway.app) (Requires a persistent Node.js service for WebSockets).
* **Database**: Serverless PostgreSQL on [Neon.tech](https://neon.tech) or [Supabase](https://supabase.com).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
