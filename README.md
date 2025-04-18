# AYAL

**AYAL** is a **MERN stack** (MongoDB, Express.js, React, Node.js) neighborhood assistance platform — where residents can connect, communicate, and collaborate with their neighbors, local workers, and community admins to create a better living experience.

---

## 🔐 Security & Verification

To ensure authenticity and safety within the platform:

- 🏠 **Residents** must **submit valid address proof** during signup.
  - Their **locality Admin** will manually verify and approve the account.
  - Only **after approval** can residents access the platform.
  - ✅ If approved, they will receive a **notification via email**.

- 👮 **Admins** also need to **submit verification documents** during signup.
  - They must be verified and approved by the **Super Admin** before gaining access.
  - ✅ If approved, they will receive a **notification via email**.

---


## 👥 User Roles & Features

### 🏠 Residents
Residents are local people in the neighborhood. They can:
- Post about what's happening in their neighborhood
- Join community groups
- Explore local services (e.g., plumbing, cleaning)
- Book services directly from workers
- Chat with their neighborhood contacts
- Explore and participate in local events

 > Note: Residents cannot self-register. Their approval must come from their locality Admins. If approved they will be notified through the mail.

---

### 🔧 Workers
Workers are local service providers. They can:
- Manage their services
- Accept or reject service bookings from residents

---

### 👮 Admin
Admins manage their assigned communities. They can:
- Approve or verify resident accounts
- Create and manage community groups
- Create and manage local events

> Note: Admins cannot self-register. Their approval must come from the Super Admin. If approved they will be notified through the mail.

---

### 🦸 Super Admin
The super admin oversees the platform. They can:
- Approve and manage Admin accounts
- Monitor overall system activity

---

## 🚀 How to Run the Project Locally

> Make sure Node.js is installed and MongoDB Atlas is properly configured in the `.env` files.

### 1. Start the Backend

cd backend
npm install
node server.js
📍Backend runs at: http://localhost:5000

### 2. Start the Frontend

cd frontend
npm install
npm run dev
📍 Frontend runs at: http://localhost:5173
