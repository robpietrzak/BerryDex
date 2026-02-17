# BerryDex

BerryDex is a small web application that allows users to look up different kinds of berries and see information about them, including sweetness, tartness, country of origin, a short biography, and fun facts. It uses a Node.js + Express backend with SQLite for storage.

---

## Features

- View all berries sorted alphabetically
- Add new berries via API (for development)
- Update berry information via API
- Delete berries via API
- Frontend displays berry information (static HTML/CSS/JS)

---

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd berrydex
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node server.js
```

The server will run at `http://localhost:3000`.

---

## Database

Berry data is stored in SQLite (`berries.sqlite`). The database is automatically created on first run and seeded with initial berries if empty.

---

## API Routes

### Get All Berries

**GET**
```
/api/berries
```

Returns all berries sorted alphabetically.

---

### Create a Berry (POST)

**POST**
```
/api/berries
```

**Body (JSON):**
```json
{
  "name": "Razz Berry",
  "sweetness": 2,
  "tartness": 4,
  "origin": "Kanto",
  "bio": "A sharply tart berry.",
  "fun_fact": "Loved in contests."
}
```

**Response:**
- `201 Created` on success
- Returns the newly created berry with its `id`

---

### Update a Berry (PUT)

**PUT**
```
/api/berries/:id
```

Example:
```
/api/berries/4
```

⚠️ All fields must be included in the request body.

**Body (JSON):**
```json
{
  "name": "Razz Berry",
  "sweetness": 2,
  "tartness": 4,
  "origin": "Kanto",
  "bio": "A sharply tart berry.",
  "fun_fact": "Now known to boost contest appeal."
}
```

**Response:**
- `200 OK` on success
- `404 Not Found` if berry does not exist

---

### Delete a Berry (DELETE)

**DELETE**
```
/api/berries/:id
```

Example:
```
/api/berries/4
```

No request body required.

**Response:**
- `200 OK` if deleted
- `404 Not Found` if berry does not exist

---

## Frontend

Static HTML/CSS/JS files are served from the project root. The frontend fetches berry data from the API and displays it in a user-friendly format.

---

## Notes

- All new berry entries and updates should be done via the API.
- Sorting is done at the SQL level, so new berries will automatically appea