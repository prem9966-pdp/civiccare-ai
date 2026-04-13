# CivicCare AI: Project Foundation & Planning

### 1. Folder Tree
```text
civiccare-ai/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   ├── admin/
│   │   │   ├── analytics/page.tsx
│   │   │   ├── schemes/page.tsx
│   │   │   └── users/page.tsx
│   │   ├── user/
│   │   │   ├── applications/page.tsx
│   │   │   ├── documents/page.tsx
│   │   │   ├── history/page.tsx
│   │   │   ├── schemes/page.tsx
│   │   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── register/route.ts
│   │   │   └── [...nextauth]/route.ts
│   │   ├── chatbot/route.ts
│   │   ├── help-centers/route.ts
│   │   ├── pdf/route.ts
│   │   ├── schemes/
│   │   │   ├── [id]/route.ts
│   │   │   └── recommend/route.ts
│   │   └── upload/route.ts
│   ├── chatbot/page.tsx
│   ├── map/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── admin/
│   ├── auth/
│   ├── dashboard/
│   ├── home/
│   ├── shared/
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   └── ai-chatbot-bubble.tsx
│   └── ui/ (shadcn)
├── constants/
├── hooks/
├── lib/
│   ├── ai/
│   ├── db/
│   │   ├── models/
│   │   │   ├── Complaint.ts
│   │   │   ├── Document.ts
│   │   │   ├── Scheme.ts
│   │   │   └── User.ts
│   │   └── mongoose.ts
│   ├── utils.ts
│   └── validaton/
├── public/
├── services/
├── store/
├── types/
├── .env
├── .gitignore
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

### 2. Architecture Overview
- **Frontend (Next.js 14 App Router)**: Server-side rendering for SEO (schemes listing) and Client-side transitions (Framer Motion) for interactivity.
- **Backend (Next.js API Routes)**: Using Edge Runtime for high-speed AI streaming and standard serverless functions for DB operations.
- **Database (MongoDB/Mongoose)**: Document-based schema to handle diverse metadata for schemes and user profiles.
- **AI Layer (LLM Service Layer)**: Integration with OpenAI/Gemini for conversational AI, RAG (Retrieval-Augmented Generation) for scheme knowledge retrieval, and application text generation.
- **Integrations**: Cloudinary/S3 for document storage, Mapbox/Leaflet for hospital discovery, and jsPDF for form generation.

### 3. Database Models
- **User**: Name, Email, Password (hashed), Role (User/Admin), Profile (Age, Location, Income, Caste category, Education, Employment - for eligibility matching), Saved Schemes, Uploaded Docs.
- **Scheme**: Title, Description, Eligibility Criteria (JSON for filters), State/Central, Category, Documents Required, Link to Official Site, Application Steps.
- **Complaint/Application**: UserRef, Type (Complaint/Application), Content, Status (Pending, Reviewed), Generated PDF URL.
- **ChatHistory**: UserRef, Messages (Role/Content), Timestamp.
- **HelpCenter**: Name, Location (GeoJSON), Type (Hospital/Aid Center), Contact Info, Service List.

### 4. API Routes
- **Auth**: POST `/api/auth/register`, POST `/api/auth/login`, POST `/api/auth/logout`.
- **AI/Chat**: POST `/api/chatbot` (Streaming response), POST `/api/chatbot/history`.
- **Schemes**: GET `/api/schemes` (Filterable list), GET `/api/schemes/recommend` (User-profile based matching), POST `/api/schemes/save`.
- **Help Centers**: GET `/api/help-centers?lat=...&lng=...&radius=...`.
- **Documents & PDF**: POST `/api/upload` (File handler), POST `/api/pdf/generate` (Draft complaints/applications).
- **Admin**: GET `/api/admin/stats`, PUT `/api/admin/schemes/[id]`.

### 5. Pages and Routes
- `/`: Landing page (Value prop, hero section).
- `/auth/login` & `/auth/register`: Authentication.
- `/dashboard`: User welcome screen with quick links.
- `/dashboard/schemes`: Browse and search government schemes.
- `/dashboard/recommendations`: AI-driven scheme discovery.
- `/dashboard/applications`: View and generate new applications.
- `/dashboard/documents`: Cloud vault for user documents.
- `/chatbot`: Full-page AI counselor for conversational support.
- `/map`: Interactive map for nearby healthcare and help centers.
- `/admin/*`: Restricted routes for managing content and analytics.

### 6. Components
- **Layout Components**: `Navbar`, `Footer`, `Sidebar`, `AuthWrapper`.
- **UI Components (shadcn)**: `Button`, `Dialog`, `Toast`, `Badge`, `Skeleton`, `Popover`, `Accordion`.
- **Feature Components**:
    - `SchemeCard`: Rich summary of a scheme + eligibility status.
    - `EligibilityForm`: Step-by-step profile builder.
    - `HospitalMap`: Leaflet/Mapbox component with custom pins.
    - `ChatWindow`: Streaming-ready interface with message bubbles.
    - `DocList`: Grid view with preview and upload integration.
- **Layout Animations**: `PageTransition` (Framer Motion).

### 7. Admin Panel Modules
- **Schemes Manager**: CRUD for schemes, bulk upload via CSV/JSON.
- **User & Role Management**: View users, change roles, track activity.
- **Analytics Dashboard**: Weekly registration trends, most searched schemes, heatmaps for help center interest.
- **Complaint Review**: Interface to see user-generated complaints and mark resolution.

### 8. User Journey
1. **Discovery**: User enters landing page, sees benefits.
2. **Onboarding**: User creates account, fills out basic profile (Eligibility parameters).
3. **Exploration**: User searches for "Health schemes" or asks Chatbot "I am a low-income farmer, what can I get?".
4. **Action**: User finds a scheme, checks the AI-generated checklist, uploads missing docs.
5. **Generation**: User clicks "Apply via AI", fills basic details, gets a pre-filled PDF application.
6. **Support**: User finds the nearest hospital on the integrated map for immediate help.

### 9. Development Phases
- **Phase 1 (Foundation)**: Next.js setup, Auth with JWT, Tailwind/shadcn configuration, Folder structure.
- **Phase 2 (Content & Core)**: MongoDB Schema implementation, Basic Scheme browsing & Search.
- **Phase 3 (AI Integration)**: Eligibility Recommendation engine (Matching logic) + Chatbot (RAG setup).
- **Phase 4 (Interactive Tools)**: Map integration for help centers, PDF generator for applications.
- **Phase 5 (User/Admin Experience)**: Dashboard (User/Admin), File upload for docs, Notifications.
- **Phase 6 (Polish)**: Framer Motion animations, Multilingual skeleton, SEO, and Performance optimization.
