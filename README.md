# CivicCare AI: Proactive Citizen Empowerment Interface

An AI-driven, proactive civic assistance platform designed to bridge the gap between complex government schemes and every citizen's life. CivicCare AI transforms bureaucratic discovery into a personalized, high-fidelity experience using predictive matching and proactive assistance.

---

## 🚀 Key Modules
- **Counselor GPT**: Multilingual medical and civic AI assistant featuring built-in emergency detection.
- **Match Engine**: Heuristic-based scheme eligibility scoring with "Deep Audit" readiness.
- **Citizen Vault**: Secure, status-tracked credential storage (Aadhar/PAN/Income).
- **Control Matrix**: Global administrative command hub for citizen audits and analytics.
- **Proximity Discovery**: Synchronized map/list engine for hospitals and help centers.

---

## 🛠️ Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion, Axios, Zod.
- **Backend**: Node.js, Express, TypeScript, MongoDB, JWT-RBAC.
- **AI**: Abstraction layer for OpenAI/Gemini with emergency-priority logic.
- **Design**: Premium Glassmorphic UI with mission-critical visual language.

---

## 🏁 Quick Start

### 1. Requirements
- Node.js (v18+)
- MongoDB (Local or Atlas)
- NPM or PNPM

### 2. Environment Setup
Fill in the `.env` from `.env.example`:
- `MONGO_URI`: `mongodb://localhost:27017/civiccare`
- `JWT_SECRET`: `your_secure_secret`
- `NEXT_PUBLIC_API_URL`: `http://localhost:5000/api/v1`

### 3. Installation & Seeding
```bash
# Install root dependencies
npm install

# Run Master Seeding (Populates Users, Schemes, Hospitals)
cd server
npm run seed:master
```

### 4. Direct Execution
```bash
# Terminal 1 (Backend)
cd server
npm run dev

# Terminal 2 (Frontend)
cd client
npm run dev
```

---

## 🔑 Demo Credentials
- **Citizen Demo**: `aarav@example.com` / `password123`
- **Admin Demo**: `admin@civiccare.ai` / `adminpassword`

---

## 🏗️ Architecture
- **Monorepo Structure**: Separation of `client/` and `server/`.
- **Vertical Integration**: Every module is self-contained with its own models, services, and controllers.
- **Predictive Flow**: Citizens fill a profile -> Schemes are matched -> Documents are verified.

---

## 🇮🇳 India-Focused Readiness
CivicCare AI is pre-seeded with high-impact Indian welfare data (PM-JAY, PM-Kisan) and healthcare assets (AIIMS, Fortis, Civic Centers), making it "Hackathon-Ready" out of the box.

---
**CivicCare AI** • *Empowering the common citizen through digital assistance.*
