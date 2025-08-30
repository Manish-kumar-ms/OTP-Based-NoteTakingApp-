# Full-Stack Note-Taking Application

This project is a full-stack note-taking application with authentication
and note management features.

## Features

1.  **User Authentication**
    -   Signup with email and OTP flow.
    -   JWT-based authentication stored in cookies.
2.  **Error Handling**
    -   Display meaningful error messages for validation failures, OTP
        errors, and API issues.
3.  **Home Page**
    -   Shows logged-in user information (name, email).
    -   Allows users to create and delete notes.
4.  **Notes Management**
    -   Notes are stored per user.
    -   User can view all their notes after login.
5.  **Responsive Design**
    -   Mobile-friendly and follows the provided design.
6.  **Security**
    -   Secure cookie-based JWT authentication.
    -   Protected routes on frontend and backend.

## Tech Stack

-   **Frontend:** React, Axios, React Router,Context API
-   **Backend:** Node.js, Express.js, MongoDB, JWT
-   **Authentication:** Email + OTP
-   **Styling:** Tailwind CSS

## APIs

### Auth Routes

-   `POST /api/auth/signup` → Signup with email
-   `POST /api/auth/send-otp` → Send OTP to email
-   `POST /api/auth/verify-otp` → Verify OTP and login
-   `GET /api/auth/currentUser` → Get logged-in user info
-   `POST /api/auth/logout` → Logout user

### Notes Routes

-   `POST /api/notes/createNotes` → Create a new note
-   `GET /api/notes/getAllNotes` → Fetch all notes for current user
-   `DELETE /api/notes/:id` → Delete note by ID

## Installation

### Backend

``` bash
cd backend
npm install
npm start
```

### Frontend

``` bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the backend with the following:
    
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
   

## How It Works

1.  User signs up with email → OTP sent → User verifies OTP → JWT token
    stored in cookies.
2.  User can log in with email/OTP or Google OAuth.
3.  After login, user lands on home page with profile info and notes
    section.
4.  User can create/delete notes. Notes are tied to their account.

## Tasks Completed

✔ Signup/Login with email and OTP\
✔ Error handling and validation\
✔ Home page with user info and notes\
✔ Create and delete notes\
✔ Protected routes (frontend + backend)\
✔ JWT + cookies authentication\
✔ Responsive mobile-friendly design


