# Oussama Hitte | Portfolio

Full-stack developer portfolio with React frontend, Node.js backend, contact form, and AI chat.

## Local Development

**You need BOTH backend and frontend running for the contact form and AI chat to work.**

### Option 1: One command (recommended)

```bash
# Install all dependencies first (run once)
npm run install:all

# Install root dev dependency (concurrently)
npm install

# Start backend (port 5000) + frontend (port 5173) together
npm run dev
```

Then open **http://localhost:5173** in your browser.

### Option 2: Two terminals

**Terminal 1 – Backend (API):**
```bash
cd backend
npm install
npm run dev
```
Backend runs at http://localhost:5000

**Terminal 2 – Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at http://localhost:5173 — open this URL in your browser.

### Environment variables

Create `backend/.env` with:
```
PORT=5000
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
CONTACT_RECEIVER=your-email@gmail.com
DEEPSEEK_API_KEY=your-deepseek-api-key
```

## Production build

```bash
npm run build
npm start
```

## Deploy (Railway)

Push to GitHub — Railway auto-deploys. Set env vars in Railway dashboard.
