# PreDay

A full-stack productivity/task management web app built with **React.js**, **Flask**, and **SQLite3** that allows users to register, log in, and manage daily tasks.

---

## Live Demo

* **Frontend:** https://preday.netlify.app/
* **Backend API:** https://predaybackend.onrender.com

---

## Features

* User Registration & Login
* Persistent Authentication using Local Storage
* Add New Tasks
* Delete Tasks
* Fetch Tasks from Backend API
* Responsive Frontend UI
* Full Frontend ↔ Backend Integration

---

## Tech Stack

### Frontend

* React.js
* CSS
* Axios / Fetch API

### Backend

* Flask
* Python
* SQLite3
* REST API
* Render Deployment

---

## Project Structure

```bash id="p2r7lc"
preday/
│
├── public/
├── src/
│   ├── Component/
│   │   ├── Authentication.js
│   │   ├── Home.js
│   │   ├── Navbar.js
│   │   └── Tasks.js
│   │
│   ├── App.js
│   └── index.js
│
└── package.json
```

---

## How It Works

1. Users register or log in
2. Authentication request is sent to Flask backend
3. User session data is stored in local storage
4. Logged-in users can create and manage tasks
5. All task operations communicate with backend API

---

## Backend Repository

> Private Repository
> Backend is hosted separately on Render.

**Backend Deployment Link:**
https://predaybackend.onrender.com

---

## Database Note

This project currently uses **SQLite3** for database storage.

> **Important:** Since the backend is deployed on Render's free tier, the server may enter standby/sleep mode after inactivity.
> Because SQLite is stored on the instance filesystem, database data may reset/reinitialize when the server restarts or redeploys.

This is a deployment limitation of the free hosting environment and not an application bug.

---

## Installation (Frontend)

```bash id="p19kdl"
git clone https://github.com/tejashhxd/preday.git
cd preday
npm install
npm start
```

---

## Environment Variables

Create a `.env` file:

```env id="8h5nzy"
REACT_APP_API_URL=your_backend_url_here
```

---

## Future Improvements

* Migrate to PostgreSQL / MongoDB for Persistent Cloud Database
* Add Edit Task Feature
* Add Due Dates / Priority Levels
* JWT Authentication
* Drag & Drop Task Ordering
* Dark Mode

---

## Author

**Tejash**
GitHub: https://github.com/tejashhxd

