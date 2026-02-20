# 🎓 Student Management System (Full Stack)

A full-stack Student Management System built with **Django REST Framework** and **React + Redux Toolkit**.  
The platform supports **JWT authentication**, **student applications**, **admin approval workflow**, and **course management**.

---

## 🚀 Features

### 🔐 Authentication
- JWT-based login & registration
- Access & refresh token handling
- Auto token refresh on expiry
- Secure logout

### 🧑‍🎓 Student Management (Admin)
- View students list
- Edit & delete students
- Students are created only after application approval

### 📝 Application Workflow
- Students can submit applications
- Admin can approve or reject applications
- Approved applications automatically create students

### 📚 Course Management
- Create, update, delete courses
- Assign courses to students

### 🖥 Frontend
- React + Redux Toolkit
- Role-based routing (Admin / Student)
- Dark admin dashboard UI
- Centralized API handling with auto refresh

---

## 🛠 Tech Stack

**Frontend**
- React
- Redux Toolkit
- Tailwind CSS
- Vite

**Backend**
- Django
- Django REST Framework
- Simple JWT
- PostgreSQL

---

## 📡 API Endpoints

### 🔐 Authentication APIs
| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/auth/login/` | User login |
| POST | `/api/auth/register/` | User registration |
| POST | `/api/auth/logout/` | Logout user |
| POST | `/api/auth/token/refresh/` | Refresh access token |
| GET | `/api/auth/user/` | Get logged-in user details |

---

### 🎓 Student APIs
| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/student/` | List all students |
| GET | `/api/student/{id}/` | Get student details |
| PATCH | `/api/student/{id}/` | Update student |
| DELETE | `/api/student/{id}/` | Delete student |

---

### 📝 Application APIs
| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/student/applications/` | List applications |
| POST | `/api/student/applications/` | Create application |
| POST | `/api/student/applications/{id}/approve/` | Approve / Reject application |

---

### 📚 Course APIs
| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/course/` | List courses |
| POST | `/api/course/` | Create course |
| GET | `/api/course/{id}/` | Get course details |
| PATCH | `/api/course/{id}/` | Update course |
| DELETE | `/api/course/{id}/` | Delete course |

---

## 🔑 Authentication Header

All protected routes require:
```http
Authorization: Bearer <access_token>
