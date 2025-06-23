# 🛒 E-Commerce Application

A full-stack e-commerce application built using **React**, **Express.js**, and **MongoDB**, featuring **JWT-based authentication**, **Razorpay** payment integration, and **admin analytics**.

---

## 📸 Screenshot

![App Screenshot](../E-commerce/frontend/src/assets/image.png)


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

🔐 Authentication
Users can register and log in using email and password.

Access tokens are issued via JWT and stored in HTTP-only cookies.

Middlewares:

protectRoute: Secures routes for authenticated users.

adminRoute: Restricts access to admin-only functionality.

💳 Payment Integration
Integrated with Razorpay.

Users can complete purchases via Razorpay Checkout.

Server-side:

create-checkout-session initializes Razorpay session.

payment success route verifies transactions.

📊 Admin Analytics
Admin users can view:

Total revenue

Sales trends

Endpoints protected by both protectRoute and adminRoute.

📦 API Endpoints (Highlights)
Authentication
POST /api/auth/signup – Register a new user

POST /api/auth/login – Login

POST /api/auth/logout – Logout

GET /api/auth/profile – Fetch user profile

Products
GET /api/products – List all products (admin)

GET /api/products/featured – List featured products

POST /api/products – Add new product (admin)

DELETE /api/products/:id – Delete product (admin)

GET /api/products/category/:category – Products by category

Cart
GET /api/cart – Fetch user cart

POST /api/cart/add – Add item to cart

POST /api/cart/remove – Remove item from cart

Coupons
POST /api/coupons – Create a new coupon (admin)

GET /api/coupons – Fetch all coupons

POST /api/coupons/apply – Apply a coupon to the cart

Payments
POST /api/payments/create-checkout-session – Create Razorpay session

POST /api/payments/success – Handle success payment

Analytics
GET /api/analytics/overview – Sales overview (admin)

GET /api/analytics/daily-sales – Daily revenue (admin)

🖼 Frontend Features
HomePage – Displays featured and recommended products

FeaturedProducts.jsx

PeopleAlsoBought.jsx

Authentication Pages – LoginPage, SignupPage

Cart & Checkout – Razorpay-integrated payment flow

State Management – Zustand-based global store

API Handling – Axios setup in lib/axios.js
