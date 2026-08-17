# 📚 StudyNook — Collaborative Study Room Booking Platform

**StudyNook** is a full-stack web application designed for university libraries and students to list, browse, search, and book private study rooms. Built with Next.js, Hero UI, Node.js, Express, and MongoDB, the platform automates time-conflict detection to prevent double-booking, enables room owners to manage listings, and offers seamless user dashboard capabilities.

---

## 🔗 Project Links

* **🌐 Live Site:** [StudyNook Platform](https://studynook-a9.vercel.app)
* **💻 Frontend Repository:** [studynook-a9](https://github.com/kazikomol/studynook-a9)
* **⚙️ Backend Repository:** [studynook-server](https://github.com/kazikomol/studynook-server)

---

## ✨ Key Features

* **🔐 Secure JWT Authentication & Cookie Storage:** Supports email/password registration and Google OAuth sign-in with JWT access tokens safely secured inside HTTP-only cookies on private server routes.
* **🛠️ Complete Owner CRUD Management:** Room owners can add, update, and delete room listings with cascading user booking updates 


---

## 🛠️ Tech Stack & Dependencies

**Frontend (Client):**
* **Framework:** Next.js (App Router)
* **UI Component Library:** Hero UI
* **Icons:** Lucide Icons & React Icons
* **Sliders & Carousel:** Swiper 
* **Styling:** Tailwind CSS
* **Authentication:** Betterauth

**Backend (Server):**
* **Runtime & Framework:** Node.js & Express.js
* **Database:** MongoDB 
* **Security & Auth:** JSON Web Tokens (JWT) & Cookie Parser
* **Environment:** `dotenv` & CORS Configuration

---

## 🚀 Local Development Setup

### Prerequisites
* Node.js (v18.x or higher)
* npm or yarn package manager
* MongoDB Database connection string

---

### Setup Instructions

#### 1. Client Setup (Next.js)

```bash
# Clone the client-side repository
git clone [https://github.com/kazikomol/studynook-a9.git](https://github.com/kazikomol/studynook-a9.git)
cd studynook-a9

# Install dependencies
npm install
