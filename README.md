
# 🚀 Ebinesh Portfolio (v1.2.0)

A high-performance, full-stack personal portfolio and Content Management System (CMS) built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. This project features a sleek user-facing landing page and a robust admin dashboard for real-time content updates.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-9-green?style=flat-square&logo=mongodb)

---

## ✨ Features

### 👤 User Interface (Landing Page)
A smooth, single-page experience designed for high conversion and modern aesthetics.
*   **Dynamic Sections:** Hero, About, Achievements, Certificates, Experience, Skills, and Contact.
*   **Smooth Animations:** Powered by `framer-motion` and `tw-animate-css`.
*   **Interactive Theme Sidebar:** 
    *   Switch between **Dark/Light** modes.
    *   Change **Theme Accent Colors**.
    *   Adjust **Border Radius** (rounded vs. sharp UI).

### 🛠 Admin Dashboard (CMS)
A full-featured backend interface to manage every aspect of the portfolio without touching the code.
*   **Authentication:** Secure Login/Register flow using `jose` (JWT) and `bcryptjs`.
*   **Content Management:** Full CRUD operations for:
    *   **Hero Section:** Edit taglines and CTAs.
    *   **About/Skills:** Update bio and technical stack.
    *   **Experience & Achievements:** Manage professional timeline.
    *   **Certificates:** Upload and organize credentials.
    *   **Contact Management:** View and manage incoming inquiries.
*   **Profile Settings:** Manage admin account details.

### ⚙️ System Features
*   **Global State:** Managed via `Redux Toolkit` and `Redux Persist`.
*   **Data Fetching:** Optimized with `TanStack Query` (React Query) for caching and synchronization.
*   **Form Handling:** Validated using `React Hook Form` + `Zod`.
*   **UX/UI Components:** Built on top of `Radix UI` primitives for accessibility.
*   **Error Handling:** Custom Global Error Boundaries, 404 Not Found pages, and sleek Loading skeletons.
*   **Notifications:** Real-time feedback using `Sonner` toasts.

---

## 🛠 Tech Stack

**Frontend:**
*   **Framework:** Next.js 16 (App Router)
*   **Library:** React 19
*   **Styling:** Tailwind CSS 4, Class Variance Authority (CVA)
*   **Animations:** Framer Motion, Lucide Icons, React Icons

**Backend & Database:**
*   **Database:** MongoDB via Mongoose
*   **Auth:** JWT (jose), Bcryptjs
*   **API:** Next.js Server Actions / API Routes + Axios

**State Management:**
*   **Global State:** Redux Toolkit (@reduxjs/toolkit)
*   **Persistence:** Redux Persist
*   **Server State:** TanStack React Query v5

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (Latest LTS)
*   Yarn package manager
*   MongoDB URI

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ebinesh-portfolio.git
    cd ebinesh-portfolio
    ```

2.  **Install dependencies:**
    ```bash
    yarn install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file in the root and add your credentials:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3000

    MONGODB_URI=your_mongodb_uri
    
    JWT_SECRET=your_secret_key
    ```

4.  **Run the development server:**
    ```bash
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## 🏗 Scripts

| Script | Description |
| :--- | :--- |
| `yarn dev` | Starts the development server. |
| `yarn build` | Builds the application for production. |
| `yarn start` | Starts the production server. |
| `yarn lint` | Lints the code using ESLint. |
| `yarn lint:fix` | Fixes linting errors and formats code. |
| `yarn format` | Formats code using Prettier. |

---

## 📂 Project Structure (Highlights)
```text
├── public/
│   ├── docs/                # Documents (e.g., Resume PDF)
│   ├── images/              # Static images (profile, icons)
│   ├── data.json            # Mock data/Static configuration
│   └── favicon.svg          # Site icon
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/          # Authentication routes (Login, Register)
│   │   ├── admin/           # Admin Dashboard pages (Contacts, Profile)
│   │   ├── api/v1/          # Backend API routes for all sections
│   │   ├── global-error.jsx # Global error boundary
│   │   ├── layout.jsx       # Root layout
│   │   ├── loading.jsx      # Global loading state
│   │   ├── not-found.jsx    # 404 page
│   │   └── page.jsx         # Main Landing Page (User view)
│   ├── components/
│   │   ├── admin/           # Edit forms for CMS (EditHero, EditAbout, etc.)
│   │   ├── client/          # Public-facing UI sections (Hero, Skill, etc.)
│   │   ├── ui/              # Reusable UI primitives (Radix/Shadcn)
│   │   └── ThemeSidebar.jsx # Theme & color customizer component
│   ├── lib/
│   │   └── utils.ts         # Helper functions (Tailwind Merge, etc.)
│   ├── models/              # Mongoose Schema definitions
│   ├── providers/           # Context Providers (Redux, Query, Theme)
│   ├── services/            # API call logic and database interactions
│   ├── slices/              # Redux Toolkit state slices & Store config
│   └── utils/               # Database connection and constants
├── .env.local               # Environment variables
├── components.json          # Shadcn UI configuration
├── next.config.ts           # Next.js configuration
├── package.json             # Project dependencies and scripts
└── yarn.lock                # Yarn lockfile

```

---

## 🎨 Theme Customizer
The application includes a unique **Theme Sidebar** that allows users to customize their viewing experience:
*   **Mode:** Toggle between Light, Dark, and System preferences via `next-themes`.
*   **Color Palette:** Real-time CSS variable injection to change the primary brand color.
*   **Border Radius:** Global adjustment for component "roundness" using Tailwind arbitrary values.

---

## 🤝 Contributing
Feel free to fork this project and submit PRs. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
[MIT](https://choosealicense.com/licenses/mit/)

**Built with ❤️ by Ebinesh**