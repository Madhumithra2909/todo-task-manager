# ✅ Todo Task Manager App

A full stack TODO application built using React, Express, MongoDB, and Firebase Auth (Google Sign-in). It helps users create, manage, and share tasks with a clean UI and real-time progress tracking.

---

## ✨ Features

- ✅ Google Login with Firebase
- ✅ Task creation, editing, and deletion
- ✅ Task classification: All, Today, Overdue
- ✅ Due date selection (with calendar)
- ✅ Share task via email
- ✅ Progress bar with percentage
- ✅ Celebration animation when all tasks complete 🎉
- ✅ Clean and responsive UI
---

## 📽️ Loom Video Demo


---

https://github.com/user-attachments/assets/fff72c59-d568-4ed0-8150-ffc519cc44ce



## 🧱 Architecture Diagram


---┌──────────────────────────────┐
│         User (Browser)       │
│ - Views Tasks                │
│ - Creates/Edits/Deletes      │
│ - Logs in with Google        │
└────────────┬─────────────────┘
             │
             ▼
┌──────────────────────────────┐
│      Frontend (Vite + React) │
│     • Hosted on Vercel       │
│     • Calls Backend API      │
└────────────┬─────────────────┘
             │
             ▼
┌──────────────────────────────┐
│   Backend (Node + Express)   │
│     • Hosted on Render       │
│     • API endpoints: /get,   │
│       /add, /toggle, etc.    │
└────────────┬─────────────────┘
             │
             ▼
┌──────────────────────────────┐
│     MongoDB Atlas (Cloud)    │
│  • Stores tasks, categories  │
│  • Stores user/task sharing  │
└──────────────────────────────┘

+ Firebase Auth (Google Sign-in)
   ↳ Handles user login


## 📌 Assumptions

- A task can be shared with only one user at a time
- Only 3 categories: Personal, Work, Others
- Due date is optional
- “Overdue” = Due date before today and not completed
- User must be signed in to create tasks



