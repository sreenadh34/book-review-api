# 📚 Book Review API

A RESTful API for a basic Book Review system with built with Node.js, Express, and MongoDB, JWT authentication,.

## Features
- User authentication (Signup/Login)
- Book management (CRUD operations)
- Review system (Submit/Update/Delete reviews)
- Search functionality (title/ author)
- Pagination and filtering
- Input validation

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Validation**: express-validator

## Prerequisites
- Node.js v18+
- MongoDB (local instance or Atlas URI)
- Postman/cURL (for API testing)

## Project Setup

### 1. Clone Repository
```bash
git clone https://github.com/sreenadh34/book-review-api.git
cd book-review-api
npm install
```
### 2. Environment Setup
* Create .env file  
  ```bash
  MONGODB_URI=your mongodb urlmongodb://localhost:27017/book-reviews
  JWT_SECRET=your_secure_secret_here
  PORT=3000
  JWT_EXPIRES_IN=1h
  ```
### 3. Start server
   ```bash
     npm run start:dev
   ```


## 🧪 Example API Requests (Postman)
## 🔐 Authentication

### ✅ Register a New User

```bash
POST /auth/signup
```

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "Stron#gPass123"
}
```

### ✅ Login

```bash
POST /auth/login
```

```json
{
  "email": "john@example.com",
  "password": "StrongPass123"
}
```

Returns: JWT token

---

## 📘 Book Routes

### ➕ Add a New Book (Authenticated)

```bash
POST /books
Authorization: Bearer <JWT_TOKEN>
```

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self-help"
}
```

### 📚 Get All Books

```bash
GET /books?
```

### 📖 Get Book by ID

```bash
GET /books/:id
```

Returns book details, average rating, and reviews (paginated)

---

## 📝 Review Routes

### ✍️ Submit a Review (Authenticated)

```bash
POST /books/:id/reviews
Authorization: Bearer <JWT_TOKEN>
```

```json
{
  "rating": 5,
  "comment": "Excellent book!"
}
```

### ✏️ Update Your Review

```bash
PUT /reviews/:id
Authorization: Bearer <JWT_TOKEN>
```

```json
{
  "rating": 4,
  "comment": "Updated review"
}
```

### 🗑️ Delete Your Review

```bash
DELETE /reviews/:id
Authorization: Bearer <JWT_TOKEN>
```

---

## 🔍 Search

```bash
GET /search?q=habits
```

Performs a case-insensitive partial search on book titles and authors.

---

## 📐 Design Decisions & Assumptions
* JWT authentication for protected routes
* Add a new book (Authenticated users only)
* Get book details by ID, including: Average rating Reviews (with pagination)
* Search books by title or author (partial and case-insensitive)
* Uses regex-based case-insensitive search
* Pagination on books and reviews
* Input validation with express-validator
* Centralized error handling middleware
  
