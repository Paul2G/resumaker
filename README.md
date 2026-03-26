# Resumaker

A **free, no-login resume builder** that lets users create, edit, and manage multiple professional resumes directly in the browser.

Resumaker focuses on simplicity, speed, and privacy — all data is stored locally, with no accounts, no tracking, and no backend required.

---

## ✨ Features

- 📝 Create and manage multiple resumes
- 🧩 Structured sections (Experience, Education, Skills, etc.)
- 💾 Client-side persistence using `localStorage`
- ⚡ Fast, intuitive, and distraction-free UI
- 🔒 No login, no signup, no data leaving the browser
- 🌐 Fully web-based

---

## 🛠 Tech Stack

- **Frontend:** React + TypeScript
- **Build Tool:** Vite
- **Package Manager:** pnpm
- **State Management:** React hooks
- **Persistence:** Browser `localStorage`
- **Styling:** CSS / TailwindCSS

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or later recommended)
- **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/paul2g/resumaker.git

# Navigate to the project folder
cd resumaker

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open your browser at `http://localhost:5173` (or the port shown in the terminal).

### Available Scripts

```bash
pnpm dev       # Start development server
pnpm build     # Type-check and build for production
pnpm preview   # Preview the production build
pnpm lint      # Run ESLint
pnpm format    # Format code with Prettier
```

---

## 🗂 Project Structure (simplified)

```
src/
 ├─ components/         # Reusable UI components
 ├─ context/            # React context providers
 ├─ locales/            # i18n translation files
 ├─ hooks/              # Custom hooks (localStorage, state)
 ├─ lib/                # Helpers and storage utilities
 └─ App.tsx
```

---

## 📦 Data Storage

Resumaker uses **localStorage** to persist data.

- Each resume is stored independently
- A lightweight index stores resume metadata (id)
- No backend or external database is required

This ensures fast access and full user privacy.

---

## 🌟 Acknowledgments

Built as a personal project to practice frontend architecture, state management, and UX-focused design.
