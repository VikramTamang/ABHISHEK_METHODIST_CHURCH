# Abhisek Methodist Church — Admin System

## Project Structure

```
church-website/
├── index.html          # Public website
├── style.css           # Public website styles
├── main.js             # Public website JS + dynamic content loader
├── admin.html          # Admin Login + Dashboard
├── admin.css           # Admin Dashboard styles
├── admin.js            # Admin Dashboard JS
├── images/             # Static images
└── backend/
    ├── server.js       # Express API server (entry point)
    ├── .env            # Environment variables (DO NOT commit to git)
    ├── models/         # Mongoose MongoDB models
    ├── routes/         # Express route handlers
    ├── middleware/     # JWT authentication middleware
    └── uploads/        # Uploaded images (auto-created)
```

---

## Setup Instructions

### Step 1 — Install MongoDB
You need MongoDB running locally **or** use [MongoDB Atlas](https://www.mongodb.com/atlas) (free cloud plan).
- **Local**: Download from https://www.mongodb.com/try/download/community and start it.
- **Atlas**: Create a free cluster and copy the connection string.

### Step 2 — Configure Environment
Edit `backend/.env` with your details:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/churchDB   # or your Atlas URI
JWT_SECRET=church_super_secret_jwt_key_2026    # change to something secure
ADMIN_EMAIL=admin@abhisekmethodistchurch.org
ADMIN_PASSWORD=admin123                         # change to a strong password!
```

### Step 3 — Start the Backend
```bash
cd backend
npm run dev       # Development (auto-restarts on changes)
# or
npm start         # Production
```

You should see:
```
Server is listening on port 5000
MongoDB successfully connected
```

### Step 4 — Open the Website
Open `index.html` directly in your browser (or serve with Live Server).

### Step 5 — Admin Panel
Navigate to `admin.html` in your browser.
- **Email**: `admin@abhisekmethodistchurch.org`
- **Password**: `admin123` (or what you set in `.env`)

---

## API Endpoints

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/auth/login` | Public | Admin login |
| GET | `/api/content/home` | Public | Get home content |
| PUT | `/api/content/home` | Admin | Update home content |
| GET | `/api/content/about` | Public | Get about content |
| PUT | `/api/content/about` | Admin | Update about content |
| GET | `/api/content/contact` | Public | Get contact info |
| PUT | `/api/content/contact` | Admin | Update contact info |
| GET | `/api/content/history` | Public | Get history events |
| POST | `/api/content/history` | Admin | Add history event |
| PUT | `/api/content/history/:id` | Admin | Edit history event |
| DELETE | `/api/content/history/:id` | Admin | Delete history event |
| GET | `/api/content/branch` | Public | Get branches |
| POST | `/api/content/branch` | Admin | Add branch |
| PUT | `/api/content/branch/:id` | Admin | Edit branch |
| DELETE | `/api/content/branch/:id` | Admin | Delete branch |
| GET | `/api/content/testimony` | Public | Get testimonies |
| POST | `/api/content/testimony` | Admin | Add testimony |
| PUT | `/api/content/testimony/:id` | Admin | Edit testimony |
| DELETE | `/api/content/testimony/:id` | Admin | Delete testimony |
| POST | `/api/upload` | Admin | Upload image |

---

## Deploying to Render (Recommended)

1. Push the `backend/` folder to a GitHub repository.
2. Create a new **Web Service** on [Render](https://render.com).
3. Set **Root Directory** to `backend`.
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `npm start`
6. Add all `.env` variables in Render's **Environment** settings.
7. Update `admin.js` and `main.js` — change `http://localhost:5000` to your Render URL.
