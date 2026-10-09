# Smart Interview Tracker

A full-stack web application that helps HR managers manage candidate interviews efficiently. HR managers can register, log in securely, add interviews, filter candidates, update interview statuses, and delete interview records through a clean dashboard.

## 🚀 Features

### 🔐 Authentication & Security
- User registration and login using email and password.
- JWT-based authentication.
- Password hashing using bcrypt.
- Protected frontend routes.
- Backend authentication middleware.
- Environment variables for sensitive configuration.

### 📊 Interview Dashboard
- View all interview records in a table.
- Add new interviews using a popup form.
- Filter interviews by candidate name, position, and status.
- Update interview details and status.
- Delete interview records.
- Pagination for interview records.
- Responsive user interface.

### 👤 Interview Management

Each interview record contains the following information:

- Candidate Name
- Position
- Email
- Interview Date
- Interview Status
- Notes

Supported interview statuses:

- `pending`
- `scheduled`
- `completed`

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- fetch
- React Router
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt

### Deployment (Optional)
- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

## 📁 Project Structure

```text
kartik7310-smart-interview-tracker/
│
├── README.md
│
├── client/
│   ├── package.json
│   ├── vite.config.js
│   ├── .env.example
│   │
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       ├── main.jsx
│       │
│       ├── components/
│       │   ├── ProtectedRoute.jsx
│       │   ├── PublicRoute.jsx
│       │   │
│       │   └── dashboard/
│       │       ├── DashboardHeader.jsx
│       │       ├── InterviewFilters.jsx
│       │       ├── InterviewModal.jsx
│       │       ├── InterviewTable.jsx
│       │       └── Pagination.jsx
│       │
│       ├── config/
│       │   └── api.js
│       │
│       └── pages/
│           ├── Dashboard.jsx
│           ├── Landing.jsx
│           ├── Login.jsx
│           └── Signup.jsx
│
└── server/
    ├── package.json
    ├── .env.example
    │
    └── src/
        ├── app.js
        ├── server.js
        │
        ├── config/
        │   └── db.js
        │
        ├── controllers/
        │   ├── auth.controller.js
        │   ├── health.controller.js
        │   └── interview.controller.js
        │
        ├── middlewares/
        │   ├── auth.middleware.js
        │   └── error.middleware.js
        │
        ├── models/
        │   ├── interview.model.js
        │   └── user.model.js
        │
        └── routes/
            ├── auth.routes.js
            ├── health.routes.js
            └── interview.routes.js
```

## ⚙️ Prerequisites

Before running the project, install the following:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- MongoDB or a MongoDB Atlas account
- Git (optional)

Verify your Node.js and npm installations:

```bash
node --version
npm --version
```

## 📥 Installation & Setup Guide

Follow these steps to run the application locally.

### Step 1: Clone the Repository

```bash
git clone https://github.com/kartik7310/smart-interview-tracker.git
```

Navigate to the project directory:

```bash
cd kartik7310-smart-interview-tracker
```

If you already have the project on your computer, skip this step.

### Step 2: Install Backend Dependencies

Navigate to the server directory:

```bash
cd server
```

Install the dependencies:

```bash
npm install
```

### Step 3: Configure Backend Environment Variables

Create a `.env` file inside the `server` directory.

**Windows Command Prompt:**

```cmd
copy .env.example .env
```

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**macOS/Linux:**

```bash
cp .env.example .env
```

Configure the required environment variables in `server/.env`.

Example:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smart-interview-tracker
JWT_SECRET=your_secure_jwt_secret
CLIENT_URL=http://localhost:5173
```

**Important:** These variable names are examples. Check `server/.env.example` and `server/src/config/db.js` to confirm the exact names expected by your implementation.

If you use MongoDB Atlas, replace the local MongoDB connection string with your Atlas connection string.

Never commit your `.env` file or expose your database credentials or JWT secret.

### Step 4: Start the Backend Server

From the `server` directory, run:

```bash
npm run dev
```

If this command is unavailable, check the scripts defined in `server/package.json`:

```bash
npm run
```

Use the appropriate script listed there.

The backend will start on the configured port if the database connection and configuration are valid.

### Step 5: Install Frontend Dependencies

Open a **new terminal** at the project root.

Navigate to the client directory:

```bash
cd client
```

Install the dependencies:

```bash
npm install
```

### Step 6: Configure Frontend Environment Variables

Create the frontend environment file.

**Windows Command Prompt:**

```cmd
copy .env.example .env
```

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**macOS/Linux:**

```bash
cp .env.example .env
```

Configure the backend API URL in `client/.env`.

Example:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Make sure the variable name matches `client/.env.example` and `client/src/config/api.js`.

The example assumes your backend uses port `5000` and the `/api` prefix. Adjust it to match your actual backend configuration.

### Step 7: Start the Frontend

From the `client` directory, run:

```bash
npm run dev
```

Vite will display a local development URL in the terminal, commonly:

```text
http://localhost:5173
```

Open the URL displayed in your terminal to access the application.

## 🔄 Application Workflow

1. Register a new account using your email and password.
2. Log in using your registered credentials.
3. Access the protected interview dashboard.
4. View the list of candidate interviews.
5. Add an interview using the popup form.
6. Filter interviews by candidate name, position, or status.
7. Update interview details or status.
8. Delete an interview when required.
9. Log out when finished.

## 🗄️ Interview Schema

An example interview record:

```json
{
  "candidate_name": "Ritika Sharma",
  "position": "React Developer",
  "status": "pending",
  "email": "ritika@gmail.com",
  "date": "2025-04-22",
  "notes": "Good in problem solving"
}
```

The supported status values are:

```text
pending
scheduled
completed
```

The actual schema and validation rules are defined in:

```text
server/src/models/interview.model.js
```

## 🔌 API Endpoints

The application provides authentication and interview management APIs.

### Authentication APIs

Registration and login use email and password.

Refer to the following file for the exact authentication endpoints:

```text
server/src/routes/auth.routes.js
```

### Interview APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/interviews` | Create a new interview |
| GET | `/interviews` | Retrieve interviews with filters |
| PUT | `/interviews/:id` | Update interview details or status |
| DELETE | `/interviews/:id` | Delete an interview |

The actual API prefix depends on the configuration in `server/src/app.js`.


### 📖 Postman API Documentation

For interactive API testing and request schemas, view the published Postman Collection:

👉 [Postman API Documentation](https://documenter.getpostman.com/view/38250883/2sBYHQ233c)

---

### Filtering Interviews

The assignment requires filtering by candidate name, status, and position.

Example request:

```http
GET /interviews?name=Ritika&status=pending&position=React%20Developer
```

Use the exact query parameter names supported by `server/src/controllers/interview.controller.js`.

## 🔒 Security

The application follows these security practices:

- Passwords are hashed using bcrypt.
- JWT is used to authenticate users.
- Protected routes restrict access to authenticated users.
- Backend middleware validates authentication for protected endpoints.
- Environment variables store sensitive configuration.
- Database credentials and authentication secrets should never be committed to GitHub.

Frontend route protection is not a substitute for backend authentication and authorization.

## 🐛 Troubleshooting

### 1. MongoDB Connection Error

- Ensure your local MongoDB server is running.
- Verify your MongoDB connection string.
- For MongoDB Atlas, check your database credentials and Network Access allowlist.
- Confirm the environment variable name matches your backend code.

### 2. Frontend Cannot Connect to Backend

- Ensure the backend server is running.
- Verify the API URL in `client/.env`.
- Check the route prefix in `server/src/app.js`.
- Check the browser's Network tab and backend terminal for errors.
- Verify that the backend CORS configuration allows the frontend origin.

### 3. Environment Variables Are Not Updating

Restart the relevant development server after modifying `.env`.

Vite exposes client-side environment variables prefixed with `VITE_` by default.

Never store private credentials or JWT secrets in frontend environment variables.

### 4. npm Script Not Found

Run the following command inside the relevant `client` or `server` directory:

```bash
npm run
```

Use a script that exists in the corresponding `package.json`.

### 5. Port Already in Use

Change the configured backend port and update the frontend API URL accordingly.

## 🚀 Deployment

Deployment is optional.

The application can be deployed using:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

General deployment steps:

1. Create a MongoDB Atlas database.
2. Deploy the backend to Render.
3. Configure backend environment variables on Render.
4. Deploy the frontend to Vercel.
5. Configure the frontend API URL to point to the deployed backend.
6. Configure backend CORS to allow the deployed frontend domain.
7. Test authentication and all interview CRUD operations after deployment.

Do not commit production secrets to the repository.

## 📦 Deliverables

- Complete source code in a GitHub repository.
- README.md containing project documentation and setup instructions.
- Deployed application links, if deployment is completed.


## 👨‍💻 Author

**Kartik Lathiyan**

GitHub: [kartik7310](https://github.com/kartik7310)

## 📄 License

No license has been specified for this project.
