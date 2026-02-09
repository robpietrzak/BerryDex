# BerryDex 🍓

> **BerryDex** is a full-stack web application that allows users to browse, search, and learn about different types of berries. Each berry has information like sweetness, tartness, origin, biography, and fun facts.

BerryDex is built with **Node.js**, **Express**, **SQLite**, and plain **HTML/CSS/JS**, making it a great portfolio project for demonstrating full-stack skills.

---

## Table of Contents
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Future Improvements](#future-improvements)  
- [License](#license)  

---

## Features

- List of berries with detailed information:
  - Name
  - Sweetness level (1–5)
  - Tartness level (1–5)
  - Origin (country/region)
  - Biography
  - Fun fact
- Dynamic search and filtering (planned)
- API endpoint to fetch berry data (`/api/berries`)
- SQLite database for persistent storage
- Fully responsive frontend
- `seed.js` script to safely add new berries to the database without creating duplicates

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** SQLite
- **Version Control:** Git & GitHub
- **Hosting/Deployment:** [Render](https://render.com/) or similar

---

## Getting Started

Follow these steps to run BerryDex locally:

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd berrydex
```

### 2. Install dependencies
```bash
npm install
```

### 3. Seed the database
- Run `seed.js` to add berries to the database (safe to run multiple times):
```bash
node seed.js
```

### 4. Run the server
```bash
node server.js
```

### 5. Open the website
- Navigate to [http://localhost:3000](http://localhost:3000) in your browser
- The BerryDex homepage should load, displaying berries from the database

### 6. Notes
- If you restart the server, berries will not duplicate thanks to the safe seed script
- Make sure `berries.sqlite` exists or let `database.js` create it

---

## Future Improvements

- Add **search and filtering** by sweetness, tartness, origin, and uses
- Add **images for each berry**
- Implement **AI-powered recommendations** (e.g., “Which berry is best for jam?”)
- Add **berry detail pages**
- Deploy online and connect with a real domain

---

## License

This project is open source and available under the [MIT License](LICENSE).

