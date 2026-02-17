# BerryDex

BerryDex is a web app that allows users to browse different kinds of berries. Each berry has details like sweetness, tartness, origin, bio, fun facts, and an optional image. The backend is built with **Node.js**, **Express**, and **SQLite**, and the frontend is a dynamic collapsible interface.

---

## Table of Contents

- [Features](#features)
- [Setup](#setup)
- [Database](#database)
- [API](#api)
- [Frontend](#frontend)
- [Future Improvements](#future-improvements)

---

## Features

- Browse berries in alphabetical order
- Collapsible berry cards showing detailed info
- Add new berries via API
- Update berry info partially via API
- Delete berries via API
- Optional image support for each berry
- Search berries by name

---

## Setup

1. Clone the repository:

```bash
git clone <your-repo-url>
cd berrydex
```

2. Install dependencies:

```bash
npm install
```

3. Ensure your database exists (`berries.sqlite`) and includes the following columns:

- `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
- `name` (TEXT)
- `sweetness` (INTEGER, 0–5)
- `tartness` (INTEGER, 0–5)
- `origin` (TEXT)
- `bio` (TEXT)
- `fun_fact` (TEXT)
- `image_url` (TEXT)

> If `image_url` is missing, run a Node script to add it:

```bash
node add_image_column.js
```

4. Start the server:

```bash
node server.js
```

5. Open your browser to `http://localhost:3000`

---

## Database

- Uses SQLite (`berries.sqlite`)
- `database.js` handles the connection and table creation
- Supports adding, updating, and deleting berries

---

## API

### GET `/api/berries`

- Returns all berries in alphabetical order.
- Example response:

```json
[
  {
    "id": 1,
    "name": "Strawberry",
    "sweetness": 4,
    "tartness": 2,
    "origin": "France",
    "bio": "A popular red berry.",
    "fun_fact": "Not a true berry",
    "image_url": "https://example.com/strawberry.png"
  }
]
```

### POST `/api/berries`

- Adds a new berry.
- Required fields: `name`
- Optional fields: `sweetness`, `tartness`, `origin`, `bio`, `fun_fact`, `image_url`
- Example request body:

```json
{
  "name": "Razz Berry",
  "sweetness": 4,
  "tartness": 2,
  "origin": "Fantasy Land",
  "bio": "A rare red berry.",
  "fun_fact": "Loved by trainers!",
  "image_url": "https://example.com/razzberry.png"
}
```

- Returns the created berry with `id`.

### PUT `/api/berries/:id`

- Updates an existing berry.
- Supports **partial updates** — only the fields you send will change.
- Allowed fields: `name`, `sweetness`, `tartness`, `origin`, `bio`, `fun_fact`, `image_url`
- Example request body (updating just the image):

```json
{
  "image_url": "https://example.com/newrazz.png"
}
```

- Returns a message confirming the update.

### DELETE `/api/berries/:id`

- Deletes a berry by its `id`.
- Returns a message confirming deletion.

---

## Frontend

- `index.html` + `style.css` + `script.js`
- Dynamic collapsible interface:  
  - Only berry name shows initially  
  - Clicking the name expands details  
  - Future image support included  
- Search berries by name

---

## Future Improvements

- Add images to all berries
- Sort/filter berries by sweetness or tartness
- Add categories or tags (e.g., "tropical", "wild")
- User authentication to allow adding/deleting berries via frontend
- Pagination for large databases
- More interactive UI animations

