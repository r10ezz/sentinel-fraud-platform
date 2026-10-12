# 🛡️ Sentinel

<div align="center">

### Real-Time Transaction Risk & Fraud Monitoring Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Socket.IO](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query)
[![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)](https://github.com/pmndrs/zustand)
[![Zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)

<p align="center">
  <b>High-throughput banking risk intelligence engine with sub-second heuristic evaluation, live WebSocket telemetry, automated case lifecycle triage, and immutable audit logs.</b>
</p>

</div>

---

## 📌 Overview

**Sentinel** is an enterprise-grade financial fraud surveillance platform designed for digital banking and payment rails (UPI, Card, Net Banking, ATM). It ingests high-volume transaction traffic, computes real-time risk scores using configurable heuristic rule engines, automatically flags anomalies, creates investigation cases, and broadcasts live threat telemetry to analysts via WebSockets.

---

## 🏛️ System Architecture

```mermaid
flowchart TB
    subgraph Client ["Client Layer (Next.js 16 + React 19)"]
        UI["Security Ops Center (SOC) Dashboard"]
        AuthStore["Zustand Auth Store & RBAC Guard"]
        SocketClient["Socket.IO Telemetry Listener"]
        SimPanel["Traffic Simulation Console"]
        CaseSheet["Forensic Investigation Sheet"]
    end

    subgraph Server ["Application Layer (Node.js + Express + TypeScript)"]
        AuthMid["JWT Auth & Role Authorization Middleware"]
        RiskEngine["Multi-Factor Risk Scoring Engine"]
        CaseEngine["Automated Case Management Service"]
        AuditEngine["Regulatory Compliance Audit Service"]
        SocketServer["Socket.IO Bi-directional Broadcast Hub"]
    end

    subgraph Storage ["Persistence Layer (PostgreSQL + Prisma ORM)"]
        UserTable[("Users & Roles")]
        TxTable[("Transactions Ledger")]
        CaseTable[("Investigation Cases")]
        AuditTable[("Immutable Audit Trail")]
    end

    Client -->|HTTPS REST with Bearer JWT| AuthMid
    AuthMid --> RiskEngine
    RiskEngine --> CaseEngine
    CaseEngine --> AuditEngine
    Server -->|Prisma Client Queries| Storage
    SocketServer <==>|Persistent WebSockets (WSS)| SocketClient
    SimPanel -->|Batch Transaction Ingestion| RiskEngine
```

---

## ⚡ Core Platform Capabilities

### 1. Multi-Factor Risk & Fraud Engine
Every inbound transaction is dynamically evaluated across multi-dimensional risk vectors:
* **High-Value Threshold**: Automatically triggers on transactions exceeding ₹50,000 INR (`+30 Risk Points`).
* **Geographic Anomaly**: Flags international IP geolocations departing from the domestic baseline (`+25 Risk Points`).
* **Merchant Reputation**: Verifies merchant credentials against enterprise whitelists (`+20 Risk Points` for unverified entities).
* **High-Risk Channel**: Evaluates vulnerable cash-out channels such as ATM withdrawals (`+15 Risk Points`).

#### Scoring Tiers:
| Score Band | Classification | System Action |
| :---: | :---: | :--- |
| **0 – 39** | `SAFE` | Transaction cleared, logged in ledger. |
| **40 – 79** | `FLAGGED` | Medium priority case created; assigned for analyst inspection. |
| **80 – 100** | `CONFIRMED_FRAUD` | Instant WebSocket alert broadcast, high-priority case created. |

---

### 2. Role-Based Access Control (RBAC)
Granular permissions strictly enforced across backend middleware (`authorizeRole`) and UI views:

| Platform Capability | ADMIN | ANALYST | VIEWER |
| :--- | :---: | :---: | :---: |
| **Live Telemetry & Dashboard** | Full Access | Full Access | Full Access |
| **Transaction Monitoring** | Full Access | Full Access | Full Access |
| **Manual Transaction Injection** | Full Access | Full Access | Read-Only |
| **Case Investigation & Resolution** | Full Access | Full Access | Read-Only |
| **Regulatory Audit Logs** | Full Access | Full Access | Restricted |
| **Traffic Simulation Engine** | Admin Only | Restricted | Restricted |

---

### 3. Bi-Directional WebSocket Streaming
* **Instant Threat Alerts**: Low-latency Socket.IO events (`fraud-alert`, `transaction-created`) trigger push toasts on the operations dashboard.
* **Auto-Refreshing Telemetry**: TanStack Query cache invalidation synchronizes metric charts, transaction logs, and open cases without manual polling.

---

### 4. Interactive Case Management Workflow
* Slide-over investigation workspace on `/cases` for detailed forensic analysis.
* **One-Click Actions**: Analysts can claim cases (**"Assign to Me"**) and resolve issues (**"Mark Resolved"**).
* Every investigation action automatically generates an immutable audit record.

---

### 5. Multi-Mode Traffic Simulation Engine
Built-in load and behavior generator to test fraud heuristics live:
* 🟢 **Normal Banking Traffic**: Typical domestic UPI and card transactions.
* 🟡 **Mixed Traffic**: Normal traffic interspersed with anomalous bursts.
* 🔴 **Fraud Attack**: High-velocity international cash-out exploits to test automated triage.

---

## 🛠️ Technology Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 16** (App Router, Turbopack) | Server & client rendering, file-based routing |
| **UI Library** | **React 19** | Modern UI primitives and state hooks |
| **Styling & Components**| **Tailwind CSS + Shadcn UI** | Accessible, responsive dark-mode security UI |
| **State & Cache** | **Zustand + TanStack Query v5** | Client authentication state and server-state caching |
| **Charts & Visuals** | **Recharts** | Telemetry area charts and distribution breakdowns |
| **Form Handling** | **React Hook Form + Zod** | Schema-validated client inputs |
| **Backend Runtime** | **Node.js + Express.js** | High-performance RESTful API microservice |
| **Language** | **TypeScript 5** | Strict type safety across frontend and backend |
| **Database** | **PostgreSQL** | Relational ledger with indexing on user, status, and dates |
| **ORM** | **Prisma ORM** | Schema migrations, relationships, and type-safe queries |
| **Real-Time Protocol** | **Socket.IO (v4)** | Bi-directional WebSocket communication |
| **Authentication** | **JWT + bcrypt** | Token-based stateless auth and salted hashing |

---

## 📡 REST API Reference

### Authentication
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Public | Authenticates credentials and issues signed JWT |
| `GET` | `/api/auth/me` | Authenticated | Fetches current user profile and role |

### Transactions
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/transactions` | Authenticated | Paginated transactions with search & filters |
| `POST` | `/api/transactions` | Admin, Analyst | Ingests transaction and executes risk heuristics |
| `GET` | `/api/transactions/:id` | Authenticated | Fetches detailed metadata for a single transaction |

### Cases
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/cases` | Authenticated | List all fraud investigation cases |
| `GET` | `/api/cases/:id` | Authenticated | Get detailed case investigation dossier |
| `PATCH` | `/api/cases/:id/assign` | Admin, Analyst | Assign case to an analyst for triage |
| `PATCH` | `/api/cases/:id/resolve` | Admin, Analyst | Resolve case and conclude investigation |

### Telemetry & Operations
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/dashboard` | Authenticated | Real-time overview metrics and recent activity |
| `GET` | `/api/analytics` | Authenticated | Aggregated fraud volume and geographic trends |
| `GET` | `/api/audit-logs` | Admin, Analyst | Immutable regulatory audit history |
| `POST` | `/api/simulation/start` | Admin Only | Initiates banking traffic simulation stream |

---

## 🔑 Default Accounts (Demo)

Pre-seeded accounts are provided for immediate testing:

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@sentinel.com` | `admin123` | Full access + Traffic simulation control |
| **Analyst** | `analyst@sentinel.com` | `analyst123` | Transaction creation + Case triage & resolution |
| **Viewer** | `viewer@sentinel.com` | `viewer123` | Read-only telemetry access |

*(One-click demo buttons are available on the `/login` page).*

---

## 💻 Local Setup Guide

### Prerequisites
* **Node.js** (v18.x or newer)
* **PostgreSQL** instance running locally or hosted on cloud (Neon, Supabase)
* **npm** or **pnpm**

### 1. Clone Repository
```bash
git clone https://github.com/r10ezz/sentinel-fraud-platform.git
cd sentinel-fraud-platform
```

### 2. Configure Backend
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/fraud_platform"
JWT_SECRET="your-super-secure-jwt-secret-key-32chars"
PORT=5000
FRONTEND_URL="http://localhost:3000"
```

Push schema and seed database:
```bash
npx prisma db push
npm run seed
```

Start backend development server:
```bash
npm run dev
# Server running on http://localhost:5000
```

### 3. Configure Frontend
Open a new terminal window:
```bash
cd frontend
npm install
```

Create a `.env.local` file in `frontend/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

Start frontend Next.js server:
```bash
npm run dev
# Application live at http://localhost:3000
```

---

## ☁️ Cloud Deployment Architecture

Sentinel is architected for modern decoupled deployment:

```mermaid
graph LR
    User([User Browser]) -->|HTTPS| Vercel["Vercel (Next.js Frontend)"]
    Vercel -->|API Requests| Render["Render / Railway (Express Backend)"]
    User <==>|WebSockets WSS| Render
    Render -->|Pooled TCP / TLS| Neon["Neon / Supabase (PostgreSQL)"]
```

### 1. Database
* Provision a free PostgreSQL database on [Neon.tech](https://neon.tech) or [Supabase](https://supabase.com).
* Copy the pooled connection string.

### 2. Backend (Render / Railway)
* Deploy as a **Web Service** (stateful container required for persistent WebSockets).
* **Root Directory**: `backend`
* **Build Command**: `npm install && npx prisma generate && npm run build`
* **Start Command**: `npm start`
* **Environment Variables**:
  * `DATABASE_URL`: `postgresql://...` (from Neon/Supabase)
  * `JWT_SECRET`: Random 32+ character string
  * `PORT`: `5000`
  * `FRONTEND_URL`: Your Vercel domain (e.g., `https://sentinel.vercel.app`)

### 3. Frontend (Vercel)
* Import the repository in [Vercel](https://vercel.com).
* **Root Directory**: `frontend`
* **Framework Preset**: `Next.js`
* **Environment Variables**:
  * `NEXT_PUBLIC_API_URL`: `https://<backend-url>/api`
  * `NEXT_PUBLIC_SOCKET_URL`: `https://<backend-url>`
* Deploy!

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).
