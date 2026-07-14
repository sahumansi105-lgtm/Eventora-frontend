# 🎉 Pro Night – Event Management System (Frontend)

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white" />
  <img src="https://img.shields.io/badge/Axios-API-5A29E4" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
</p>

## 📖 About the Project

**Pro Night** is a modern full-stack Event Management System designed to simplify event discovery, online ticket booking, secure payments, and event entry validation.

The frontend is built using **React.js** and communicates with a **Spring Boot REST API** to provide a seamless user experience. Users can browse events, book passes, complete payments through Razorpay, receive QR-based tickets, manage bookings, earn rewards, and get AI-powered event recommendations. Administrators can manage events, bookings, users, passes, revenue, and validate tickets using a QR scanner. :contentReference[oaicite:1]{index=1}

---

# ✨ Features

## 👤 User Module

- User Registration
- Secure Login
- JWT Authentication
- Forgot Password using OTP
- Reset Password
- User Profile Management
- Dashboard Overview
- Logout

---

## 🎉 Event Module

- Browse All Events
- Featured Events
- Trending Events
- Upcoming Events
- Live Events
- Past Events
- Search Events
- Filter Events
- View Event Details
- Artist Information
- Venue Details
- Event Countdown

---

## 🎫 Pass Booking Module

- View Available Passes
- Pass Quantity Selection
- Booking Summary
- Dynamic Price Calculation
- Terms & Conditions Validation
- Secure Booking Process
- Booking Confirmation
- Booking History

---

## 💳 Payment Module

- Razorpay Payment Gateway
- Secure Online Payments
- Payment Verification
- Payment Success Page
- Payment Failure Handling

---

## 🎟 Digital Ticket System

- QR Code Generation
- Digital Event Ticket
- Ticket Download
- PDF Ticket Support
- Booking Confirmation

---

## ✅ Ticket Validation

### User

- Receive QR Ticket after successful booking
- View booked tickets
- Download ticket

### Admin

- Scan QR Ticket
- Verify Ticket Authenticity
- Validate Event Entry
- Prevent Duplicate Check-in
- Mark Ticket as Checked-In

---

## ❤️ Wishlist

- Add Event to Wishlist
- Remove Event
- View Saved Events

---

## 🎁 Rewards Module

- Loyalty Points
- Reward Dashboard
- Claim Rewards
- Membership Levels

---

## 🤖 AI Recommendation Module

- Personalized Event Recommendations
- Recommendation Based on User Interests
- AI Powered Suggestions

---

## 📞 Contact Module

- Contact Form
- Email Support

---

## 👨‍💼 Admin Module

- Admin Dashboard
- Event Management
- Pass Management
- Booking Management
- User Management
- Revenue Dashboard
- Low Stock Pass Monitoring
- Cancellation Request Management
- QR Ticket Scanner

---

## 🎨 UI Features

- Responsive Design
- Mobile Friendly
- Modern Interface
- Toast Notifications
- Loading Indicators
- Protected Routes
- Role-Based Navigation
- Reusable Components

---

# 🛠 Tech Stack

### Frontend Technologies

- React.js
- Vite
- JavaScript (ES6)
- HTML5
- CSS3
- Bootstrap

### Libraries

- React Router DOM
- Axios
- Fetch API
- React Toastify
- React Icons
- html5-qrcode
- Swiper
- html2canvas
- jsPDF

---

# 🏗 Application Architecture

                    User
                      │
                      ▼
             React Frontend (Vite)
                      │
        Axios / Fetch REST API Calls
                      │
                      ▼
          Spring Boot Backend APIs
                      │
                      ▼
        Spring Security + JWT Authentication
                      │
                      ▼
                 MySQL Database
                      │
     Razorpay │ QR │ Email │ Gemini AI



# 📂 Project Structure


src
│
├── assets
├── Components
├── CSS
├── Layouts
├── Pages
├── Pages2
├── services
├── App.jsx
├── main.jsx
└── package.json



# 📄 Main Pages

### Public Pages

- Home
- Events
- Event Details
- Login
- Register
- Forgot Password
- Contact
- AI Recommendations

### User Pages

- Dashboard
- Profile
- My Tickets
- Wishlist
- Rewards
- Booking History

### Admin Pages

- Dashboard
- Manage Events
- Add/Edit Event
- Manage Passes
- Add/Edit Pass
- Manage Bookings
- Manage Users
- Revenue
- QR Ticket Scanner


# 🔐 Authentication

The frontend uses **JWT Authentication**.

After successful login:

- JWT Token is stored in Local Storage
- User information is stored locally
- Protected API requests include:

http
Authorization: Bearer <JWT_TOKEN>


# 💳 Booking Workflow


Browse Events
      │
      ▼
View Event Details
      │
      ▼
Select Pass
      │
      ▼
Choose Quantity
      │
      ▼
Create Booking
      │
      ▼
Razorpay Payment
      │
      ▼
Payment Verification
      │
      ▼
QR Ticket Generated
      │
      ▼
Download Ticket


# 🎟 QR Ticket Validation


User Books Ticket
        │
        ▼
QR Code Generated
        │
        ▼
Admin Opens QR Scanner
        │
        ▼
Scan Ticket
        │
        ▼
Backend Validation
        │
        ▼
Ticket Marked Checked-In


# ⚙️ Installation

## Clone Repository


git clone https://github.com/sahumansi105-lgtm/Eventora-frontend.git


## Navigate

cd Eventora-frontend


## Install Dependencies


npm install


## Start Development Server

npm run dev


Application runs at:
http://localhost:5173


# 🔗 Backend Repository

The frontend consumes REST APIs developed using Spring Boot.

Backend Repository:


https://github.com/sahumansi105-lgtm/Eventora-backend


Default Backend URL
http://localhost:8080


# 🚀 Future Enhancements

- Seat Selection
- Multi-language Support
- Push Notifications
- Social Login
- Coupon & Promo Codes
- Event Reviews & Ratings
- Calendar Integration
- Dark Mode
- PWA Support

---

# 👩‍💻 Developer

**Mansi Sahu**

🎓 B.Com Graduate | Java Full Stack Developer

### Skills

- Java
- Spring Boot
- Spring Security
- Hibernate
- MySQL
- React.js
- JavaScript
- HTML
- CSS
- REST APIs

### GitHub

https://github.com/sahumansi105-lgtm

### LinkedIn (https://www.linkedin.com/in/mansi-shahu105)



# ⭐ Support

If you found this project useful, please consider giving it a **⭐ Star** on GitHub.

It motivates me to build more projects and continuously improve.
