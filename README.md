# 📚 Manga Marketplace Backend

A powerful and scalable **Node.js + Express.js + MongoDB** backend built for a **MERN stack e-commerce platform** where users can **buy and sell manga**. This API is structured for future extensibility, performance, and integration with modern frontend tools.

---

## 🚀 Features

- User Authentication (Register, Login, JWT-secured)
- Manga Listing CRUD (Create, Read, Update, Delete)
- Wishlist / Bookmarking system
- Buy & Sell logic
- User profile management
- Admin features (Manga approval, moderation)
- MongoDB with Mongoose ODM
- Clean RESTful API structure
- Modular MVC architecture

---

## 🛠 Tech Stack

| Tech        | Description                           |
|-------------|---------------------------------------|
| Node.js     | JavaScript runtime                    |
| Express.js  | Fast and minimalist web framework     |
| MongoDB     | NoSQL document database               |
| Mongoose    | ODM for MongoDB                       |
| JWT         | Authentication with JSON Web Tokens   |
| Bcrypt      | Password hashing                      |
| Dotenv      | Environment variable management       |
| Nodemon     | Dev-time server reloader              |

---

## 📂 Project Structure

 ```bash
 src/
 ├── controllers/       # Route logic
 ├── models/            # Mongoose schemas
 ├── routers/           # API route definitions
 ├── middlewares/       # Custom middlewares
 ├── config/            # DB & server config
 └── server.js          # Entry point
 ```

---

## 🔐 Authentication API

| Method | Endpoint          | Description                  |
|--------|-------------------|------------------------------|
| POST   | `/api/register`   | Register new user            |
| POST   | `/api/login`      | User login, returns JWT      |

---

## 👤 User API

| Method | Endpoint               | Description                  |
|--------|------------------------|------------------------------|
| GET    | `/api/users`           | Get all users (admin only)   |
| GET    | `/api/user/:id`        | Get user by ID               |
| PUT    | `/api/user/update/:id` | Update user info             |
| DELETE | `/api/user/delete/:id` | Delete a user (admin only)   |

---

## 📚 Manga API

| Method | Endpoint                  | Description                        |
|--------|---------------------------|------------------------------------|
| POST   | `/api/manga/create`       | Add a new manga listing            |
| GET    | `/api/manga`              | Get all manga listings             |
| GET    | `/api/manga/:id`          | Get a single manga by ID           |
| PUT    | `/api/manga/update/:id`   | Update a manga listing             |
| DELETE | `/api/manga/delete/:id`   | Delete a manga listing             |

---

## 📌 Wishlist API (Optional)

| Method | Endpoint                      | Description                          |
|--------|-------------------------------|--------------------------------------|
| POST   | `/api/wishlist/add/:mangaId`  | Add manga to user's wishlist         |
| GET    | `/api/wishlist/:userId`       | Get user's wishlist                  |
| DELETE | `/api/wishlist/remove/:mangaId` | Remove manga from wishlist         |

---

## 🛒 Buy & Sell Logic (Optional - Placeholder)

> To be implemented — will include:
- Buying flow
- Inventory update
- Order confirmation
- Payment gateway integration (future)

---

## 🔧 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/GitNinja36/Manga-BE.git
cd Manga-BE
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables

```env
 PORT=5000
 MONGODB_URI=mongodb://localhost:27017/manga_marketplace
 JWT_SECRET=your_jwt_secret
 ```

### 4. Run the server
```bash
npm run dev   # development
npm start     # production
```

---

## ☁️ Deployment Options
 This backend can be easily deployed on:
 - [x] Render
 - [x] Railway
 - [x] Heroku
 - [ ] AWS EC2 (planned)
 - [ ] Docker (coming soon)

---
