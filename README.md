# 🎓 Student Management System (Full Stack)

A full-stack Student Management System built with **Django REST Framework** and **React + Redux Toolkit**.  
The platform supports **JWT authentication**, **student applications**, **admin approval workflow**, and **academic management**.

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

### 📚 Academic Management
- Subjects management
- Exams management
- Student marks entry with validation
- Absent students automatically get 0 marks

### 🖥 Frontend
- React + Redux Toolkit
- Role-based routing (Admin / Student)
- Dark admin dashboard UI
- Centralized API handling with auto refresh

---

## 🛠 Tech Stack

### Frontend
- React
- Redux Toolkit
- Tailwind CSS
- Vite

### Backend
- Django
- Django REST Framework
- Simple JWT
- PostgreSQL

---

## 🧪 Frontend Testing

The frontend includes **unit and component tests** to ensure UI reliability and correct behavior.  
Testing is implemented using **React Testing Library** and **Vitest**.

### Testing Tools
- React Testing Library
- Vitest
- Jest DOM matchers

### What is Tested
Tests focus on **user-visible behavior rather than implementation details**, following the recommended testing philosophy.

Examples of tested features:

- Dashboard statistics rendering
- Application list UI states (data, empty, error)
- Conditional UI based on application status
- Form rendering and submission
- Button interactions
- Redux-connected component behavior

### Example Test Scenarios
- Rendering of admin dashboard statistics cards
- Displaying applications in the admin application list
- Showing correct UI for approved, rejected, and pending applications
- Rendering and submitting the course creation form
- Form inputs and user interactions

### Running Frontend Tests

Run all tests:

bash
npm run test

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

### 📘 Subject APIs
| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/subjects/` | List all subjects |
| POST | `/api/subjects/` | Create a subject |
| GET | `/api/subjects/{id}/` | Get subject details |
| PUT | `/api/subjects/{id}/` | Update subject |
| DELETE | `/api/subjects/{id}/` | Delete subject |

---

### 📝 Exam APIs
| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/exams/` | List all exams |
| POST | `/api/exams/` | Create an exam |
| GET | `/api/exams/{id}/` | Get exam details |
| PUT | `/api/exams/{id}/` | Update exam |
| DELETE | `/api/exams/{id}/` | Delete exam |

---

### 📊 Marks APIs
| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/marks/` | List all marks |
| POST | `/api/marks/` | Create marks entry |
| GET | `/api/marks/{id}/` | Get marks details |
| PUT | `/api/marks/{id}/` | Update marks |
| DELETE | `/api/marks/{id}/` | Delete marks |

---

### 🔐 Student-Exclusive APIs
| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/student/subjects/` | Get subjects assigned to the logged-in student |
| GET | `/api/student/exams/` | Get exams for the student’s subjects |
| GET | `/api/student/marks/` | Get marks for the student’s exams |

### ✅ Access Rules
- User must be authenticated
- User must have a student profile
- Students can only see their own data
- No IDs are passed from frontend
- Data is filtered server-side using logged-in user

---

## 🔑 Authentication Header

All protected routes require:

```http
Authorization: Bearer <access_token>

## 🔑 Authentication Header

All protected routes require:
```http
Authorization: Bearer <access_token>
