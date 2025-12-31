# Project Audit Report

**Date:** 2025-12-25
**Scope:** Full Stack (Frontend & Backend)

## Executive Summary
The project contains critical security vulnerabilities, architectural flaws, and code quality issues that render it unsuitable for production in its current state. Immediate attention is required to secure user data (passwords are currently stored in plain text) and fix broken architectural patterns (backend libraries in frontend).

---

## 1. Critical Security Vulnerabilities

### 1.1 Plain Text Password Storage
- **File:** `backend/server.js` (Login/Register routes)
- **Issue:** User passwords are stored and compared directly in plain text.
- **Risk:** If the database is compromised, all user passwords are exposed immediately.
- **Remediation:** Implement `bcryptjs` or `argon2` to hash passwords before saving and verify hashes during login.

### 1.2 Unprotected Backend Endpoints
- **File:** `backend/server.js`
- **Issue:** Sensitive endpoints (e.g., `/api/alluser`, `/api/deleteuser`, product management routes) lack Authentication or Authorization middleware.
- **Risk:** Any user (or malicious actor) can list, delete, or modify data without logging in.
- **Remediation:** Implement JWT-based middleware to verify tokens on all protected routes.

### 1.3 Insecure File Operations & Global Variables
- **File:** `backend/server.js`
- **Issue:** 
    - The variable `categorypic` is defined globally. In a concurrent environment (multiple users uploading at once), this will lead to race conditions where one user's file overwrites another's reference.
    - `fs.unlink(req.body.oldpic)` uses user input directly to delete files.
- **Risk:** Race conditions, data corruption, and potential arbitrary file deletion (Path Traversal).
- **Remediation:** Use local scope variables inside route handlers. Validate file paths before deletion.

### 1.4 Hardcoded Secrets & Configuration
- **File:** `backend/server.js`, `frontend/src/*`
- **Issue:** 
    - MongoDB connection strings are hardcoded (or have hardcoded fallbacks).
    - API Keys (e.g., Gemini) are present in comments or code.
- **Risk:** Credential leakage.
- **Remediation:** Strictly use `.env` files and never commit them (ensure they are in `.gitignore`).

---

## 2. Architectural Issues

### 2.1 Mixed Dependencies in Frontend
- **File:** `frontend/package.json`
- **Issue:** The frontend `package.json` includes backend-only libraries:
    - `mongoose`
    - `express`
    - `multer`
    - `jsonwebtoken` (should be used for decoding only, if at all, but often `jwt-decode` is preferred)
- **Impact:** bloated bundle size, potential confusion about where code runs, and security risks if backend logic is attempted in the browser.
- **Remediation:** Remove these dependencies from `frontend/package.json`.

### 2.2 Monolithic Backend Structure
- **File:** `backend/server.js`
- **Issue:** A single file contains:
    - Database connection
    - Schema definitions (User, Product, etc.)
    - Middleware configuration
    - All API Route definitions
- **Impact:** Extremely difficult to maintain, test, and scale.
- **Remediation:** Refactor into a standard MVC or layered architecture:
    - `models/` (Schema definitions)
    - `routes/` (API route definitions)
    - `controllers/` (Business logic)
    - `config/` (DB connection)

### 2.3 Hardcoded API URLs in Frontend
- **Files:** `frontend/src/login.js`, `frontend/src/register.js`, and others.
- **Issue:** API calls use hardcoded strings like `http://localhost:5000/api/...`.
- **Impact:** The app will break when deployed to production.
- **Remediation:** Use an environment variable (e.g., `process.env.REACT_APP_API_URL`) to define the base URL.

---

## 3. Code Quality & Best Practices

- **Inconsistent Error Handling:** Many backend routes do not use `try-catch` blocks effectively or send inconsistent error response structures.
- **Missing Input Validation:** API endpoints blindly trust `req.body` without validation (e.g., checking if email is valid, if required fields are present).
- **Console Logs:** Production code (implied by lack of build/dev separation) contains `console.log` statements which can leak info or clutter logs.

---

## 4. Recommendations & Next Steps

1.  **Immediate Fix:** Remove backend dependencies from frontend `package.json`.
2.  **Security Priority:** Implement `bcrypt` for passwords and create a JWT authentication middleware for the backend.
3.  **Refactor:** Split `backend/server.js` into Models, Routes, and Controllers.
4.  **Configuration:** Centralize configuration (Ports, DB URIs, API URLs) in `.env` files for both frontend and backend.
