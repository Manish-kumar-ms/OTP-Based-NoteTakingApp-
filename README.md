# 📝 Full-Stack Note-Taking Application

A **full-stack MERN application** that allows users to:  
- Sign up with **Email + OTP**.  
- Securely log in and manage session with **JWT stored in cookies**.  
- Create and delete personal notes.  
- View user profile information after login.  
- Enjoy a **responsive, mobile-friendly UI** that matches the given design.  

---

## 🌐 Live Demo  

- **Frontend**: [https://otp-based-notetakingapp-frontend.onrender.com](https://otp-based-notetakingapp-frontend.onrender.com)  
- **Backend**: [https://otp-based-notetakingapp-backend.onrender.com](https://otp-based-notetakingapp-backend.onrender.com)  

---

## 🚀 Features  

### 🔹 Authentication & User Management  
- Signup with **Email + OTP**.  
- Optional **Google OAuth login**.  
- JWT authentication stored in **HTTP-only cookies**.  
- Protected routes on both **frontend** and **backend**.  

### 🔹 Notes Management  
- Create personal notes.  
- Delete notes.  
- Each note is tied to the logged-in user.  

### 🔹 Error Handling & Validation  
- Real-time input validation.  
- Clear error messages for **invalid OTP, wrong credentials, or server issues**.  

### 🔹 Security  
- Cookies are **HTTP-only** and sent only to the server.  
- Protected APIs require valid JWT.  

### 🔹 Responsive Design  
- Works across **desktop, tablet, and mobile**.  
- Matches the provided Figma/design assets.  

---

## 🛠️ Tech Stack  

**Frontend:**  
- ⚛️ React.js  
- 📡 Axios  
- 🌐 React Router  
- 🎨 Tailwind CSS
- Context API

**Backend:**  
- 🟢 Node.js + Express.js  
- 🍃 MongoDB + Mongoose  
- 🔑 JWT Authentication  
- 📧 Nodemailer (for OTP)  

---

## 📦 Installation  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/your-username/note-app.git
cd note-app
```

### 2️⃣ Install dependencies  

#### Backend  
```bash
cd backend
npm install
```

#### Frontend  
```bash
cd ../frontend
npm install
```

---

## ⚙️ Environment Variables  

Create a `.env` file inside the **backend** folder:  

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

```

---

## ▶️ Running the App  

### Start the backend  
```bash
cd backend
npm start
```

### Start the frontend  
```bash
cd frontend
npm run dev
```

---

## 🔗 API Endpoints  

### **Auth Routes**  
- `POST /api/auth/signup` → Signup with email  
- `POST /api/auth/send-otp` → Send OTP  
- `POST /api/auth/verify-otp` → Verify OTP & login  
- `GET /api/auth/currentUser` → Get logged-in user info  
- `POST /api/auth/logout` → Logout  

### **Notes Routes**  
- `POST /api/notes/createNotes` → Create note  
- `GET /api/notes/getAllNotes` → Get all notes  
- `DELETE /api/notes/:id` → Delete note  

---


---

## ✅ Tasks Completed  

✔ Signup/Login with Email + OTP  
✔ JWT + Cookies authentication  
✔ Create and Delete Notes  
✔ Error Handling and Validation  
✔ Responsive Design  

---

📜 This project is licensed under the **MIT License**.  
