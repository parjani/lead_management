# Lead Management Platform

A full-stack lead management application designed for small sales teams to capture, manage, assign, and track leads throughout their lifecycle.

The application includes a public lead capture form and an authenticated dashboard with role-based access control for Admin and Member users.

Users can manage leads, update lead status, assign leads, add notes with timestamps, and track all activities performed on leads.

---

# Features

## Public Lead Capture
- Public form to submit new leads without authentication
- Captures lead details and stores them in the database
- Automatically creates a lead entry for sales follow-up

## Authentication & Authorization
- Secure user authentication using JWT
- Role-based access control
- Two user roles:
  - Admin
  - Member
- Permissions enforced on both frontend and backend

## Lead Management
- Create, view, update, and manage leads
- Lead lifecycle management with statuses:
  - New
  - Contacted
  - Qualified
  - Converted
  - Closed
- Assign leads to team members

## Notes & Activity Tracking
- Add notes to leads
- Store notes with timestamps
- Maintain activity history for lead actions

## API Features
- RESTful JSON API
- Pagination support
- Filtering support
- Proper HTTP status codes
- API documentation included

## Testing
- Automated tests for authentication rules
- Tests covering core lead management flows

---

# Tech Stack

## Frontend
- React.js
- Vite
- JavaScript
- CSS / Tailwind CSS (if used)
- Axios for API communication

## Backend
- Node.js
- Express.js
- JWT Authentication
- REST API

## Database
- MongoDB
- Mongoose ODM

## Deployment
- Frontend: (Your hosting name)
- Backend: (Your hosting name)
- Database: MongoDB Atlas

---

# Project Structure
lead_management/

│
├── src/ # React + Vite frontend
│ │
│ ├── api/ # Frontend API service layer
│ │ ├── activity.js
│ │ ├── authApi.js
│ │ ├── axios.js
│ │ ├── dashboardApi.js
│ │ ├── leadApi.js
│ │ ├── memberApi.js
│ │ └── profileApi.js
│ │
│ ├── assets/ # Images and static assets
│ │
│ ├── components/ # Reusable UI components
│ │
│ ├── layouts/ # Application layouts
│ │
│ ├── pages/ # Application pages
│ │
│ ├── routes/ # Frontend route configuration
│ │
│ ├── utils/ # Helper functions
│ │
│ ├── App.jsx
│ ├── App.css
│ ├── index.css
│ └── main.jsx
│
├── server/ # Node.js + Express backend
│ │
│ ├── controllers/ # Business logic
│ │
│ ├── routes/ # API route definitions
│ │
│ ├── models/ # MongoDB schemas
│ │
│ ├── middleware/ # Authentication & authorization middleware
│ │
│ ├── config/ # Database configuration
│ │
│ ├── tests/ # Automated tests
│ │
│ └── server.js # Backend entry point
│
├── public/ # Public frontend assets
│
├── .env # Environment variables
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

# Database Design

The application uses MongoDB as the database with Mongoose for schema modeling.

## User Model

Stores application users and their roles.

Fields:

- name
- email
- password (encrypted)
- role
  - admin
  - member
- createdAt
- updatedAt

Example:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "member"
}

# Authentication & Authorization

The application uses JWT-based authentication for securing private routes and managing user sessions.

## Authentication Flow

1. User registers or logs in with email and password.
2. Backend validates user credentials.
3. Passwords are securely hashed before storing in MongoDB.
4. Server generates a JWT token after successful authentication.
5. Token is sent with API requests to access protected resources.

---

# User Roles & Permissions

The application supports two roles:

## Admin

Admin users have full access to the application.

Permissions:

- View all leads
- Create new leads
- Update any lead
- Assign leads to members
- Change lead status
- Add notes
- View activity history
- Manage users

---

## Member

Member users have limited access based on assigned leads.

Permissions:

- View assigned leads only
- Update assigned leads
- Change lead status of assigned leads
- Add notes to assigned leads
- View activity history of assigned leads

---

# Authorization Implementation

Role permissions are enforced on both frontend and backend.

## Backend Protection

- JWT middleware validates user identity.
- Role-based middleware checks user permissions.
- Unauthorized requests return proper HTTP status codes.

Example:
401 Unauthorized
Returned when:
- Token is missing
- Token is invalid

403 Forbidden

Returned when:
- User does not have required permission

---

## Frontend Protection

Frontend implements route protection by:

- Checking authentication state
- Restricting dashboard access for unauthenticated users
- Showing features based on user role
- Preventing unauthorized UI actions

Example:
Admin Dashboard
|
├── Manage Users
├── View All Leads
└── Assign Leads

Member Dashboard
|
├── View Assigned Leads
├── Update Leads
└── Add Notes
