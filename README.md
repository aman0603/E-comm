# 🛒 E-Commerce Application

A full-stack e-commerce application built using **React**, **Express.js**, and **MongoDB**, featuring **JWT-based authentication**, **Razorpay** payment integration, and **admin analytics**.

---

## 📸 Screenshot

![App Screenshot](./frontend/src/assets/image.png)


---

## 🚀 Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Razorpay** for payments
- **dotenv** for environment configuration

### Frontend
- **React** (via **Vite**)
- **React Router** for routing
- **Zustand** for state management
- **Axios** for API calls
- **Tailwind CSS** for styling

---

## 📂 Project Structure
```
backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── lib/
└── server.js

frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── lib/
│ └── main.jsx
└── index.html
```

---

##  Setup Instructions

###  Backend

1. **Install dependencies**

```bash
git clone https://github.com/aman0603/E-comm.git
npm install
```
2. **Create a .env file in the root directory**

PORT=5000
MONGO_URI=<Your MongoDB connection string>
JWT_ACCESS_KEY=<Your JWT access key>
JWT_REFRESH_KEY=<Your JWT refresh key>
RAZORPAY_KEY_ID=<Your Razorpay Key ID>
RAZORPAY_KEY_SECRET=<Your Razorpay Key Secret>

**Replace all placeholder values with your actual credentials.**

3. **Run the backend server**

```bash
npm run dev
```

###  Frontend

1. **Install dependencies**

```bash
cd frontend
npm install
```

2. **Run the development server**

```bash
npm run dev
```
**During development, /api requests are proxied to http://localhost:5000 using vite.config.js.**

---


## Authentication

- Users can **register and log in** using email and password.
- **JWT tokens** are issued and stored in **HTTP-only cookies** for secure sessions.

###  Middleware

- `protectRoute` – Restricts access to authenticated users only.
- `adminRoute` – Allows access to admin-only resources.

---

## Payment Integration

- Integrated with **Razorpay** for secure payments.
- Users complete purchases via **Razorpay Checkout**.

### Server-side Logic

- `POST /api/payments/create-checkout-session` – Initializes Razorpay session.
- `POST /api/payments/success` – Verifies successful transaction.

---

## Admin Analytics

Admin users can view:

- **Total revenue**
- **Sales trends**

> All analytics endpoints are protected by both `protectRoute` and `adminRoute`.

---