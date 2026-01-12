# 🚀 Project Roadmap: Enterprise SaaS Starter Kit

This project aims to build a production-grade, opinionated Node.js backend boilerplate.
Each item below is designed to be a "daily contribution" - small enough to finish in 1 session, but complex enough to look professional.

## 📦 Phase 1: Core Foundation (Current)
- [x] **Project Scaffolding**: TypeScript, Express, Basic Structure
- [x] **Observability**: Structured Logging with Correlation IDs
- [ ] **Configuration Management**: Add `dotenv` and type-safe config validation (e.g., `envalid`)
- [ ] **Error Handling**: Global Error Handler middleware with operational vs programmer error distinction
- [ ] **Health Checks**: `/health` and `/ready` endpoints for Kubernetes/Docker

## 🛡️ Phase 2: Security & Validation
- [ ] **Security Headers**: Implement `helmet`
- [ ] **CORS**: Configure `cors` middleware properly
- [ ] **Input Validation**: Set up `zod` or `joi` middleware for request validation
- [ ] **Rate Limiting**: Implement `express-rate-limit`

## 👤 Phase 3: Authentication & Users
- [ ] **Database Setup**: Connect MongoDB with `mongoose`
- [ ] **User Model**: Create User schema with password hashing (`bcrypt`)
- [ ] **Registration API**: `POST /auth/register`
- [ ] **Login API**: `POST /auth/login` returning JWT
- [ ] **Auth Middleware**: JWT verification middleware

## 🛠️ Phase 4: Developer Experience
- [ ] **Linting**: Add `eslint` and `prettier`
- [ ] **Husky**: Pre-commit hooks
- [ ] **Docker**: Create `Dockerfile` and `docker-compose.yml`
- [ ] **Unit Tests**: Setup `jest` and write first test

## 📡 Phase 5: Advanced Features
- [ ] **Email Service**: Abstracted email sender (SendGrid/Resend wrapper)
- [ ] **File Uploads**: S3 integration for file uploads
- [ ] **Pagination**: Reusable pagination utility
- [ ] **API Documentation**: Swagger/OpenAPI setup
