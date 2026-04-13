# CivicCare AI: API Inventory (v1.0.2)

All endpoints are reachable via `http://localhost:5000/api/v1/`.

---

## 🔐 Authentication Module
| Endpoint | Method | Role | Description |
|---|---|---|---|
| `/auth/signup` | `POST` | Public | Citizen registration node. |
| `/auth/login` | `POST` | Public | Session establishment (JWT). |
| `/auth/me` | `GET` | User | Active-profile audit. |

---

## 🏥 Proximity Discovery Hub
| Endpoint | Method | Role | Description |
|---|---|---|---|
| `/hospitals` | `GET` | Public | Faceted search for medical facilities. |
| `/hospitals/:id` | `GET` | Public | Detailed telemetry for a facility. |

---

## 📜 Scheme Match Engine
| Endpoint | Method | Role | Description |
|---|---|---|---|
| `/schemes` | `GET` | User | Global catalog browse/filter. |
| `/schemes/:id` | `GET` | User | Deep audit of scheme eligibility. |
| `/schemes/recommend` | `POST` | User | AI-driven profile matching. |

---

## 🤖 Counselor & Advocacy
| Endpoint | Method | Role | Description |
|---|---|---|---|
| `/chat/send` | `POST` | User | AI-synchronous message exchange. |
| `/chat/sessions` | `GET` | User | Historical conversation archive. |
| `/letters/draft` | `POST` | User | Formal generative-text engine. |
| `/letters/:id/export` | `GET` | User | PDF generation and dispatch. |

---

## 🛠️ Administrative Control (RBAC)
| Endpoint | Method | Role | Description |
|---|---|---|---|
| `/admin/summary` | `GET` | Admin | Global analytics and stats. |
| `/admin/users` | `GET` | Admin | Citizen integrity audit trail. |
| `/admin/schemes/upsert` | `POST` | Admin | CRUD for national welfare data. |

---
*Note: All protected routes require a `Bearer <token>` in the Authorization header.*
