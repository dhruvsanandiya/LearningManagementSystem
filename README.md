# 📚 Learning Management System (LMS)

An enterprise-level Learning Management System built with ASP.NET Core 8.0 and React 19.

## 🎯 Features

### For Students
- Browse and enroll in courses
- Watch video lectures and download materials
- Take quizzes and submit assignments
- Track learning progress
- Earn certificates upon completion
- Participate in course discussions

### For Teachers
- Create and manage courses
- Upload various content types (videos, PDFs, presentations)
- Create quizzes with auto-grading
- Create and grade assignments
- Monitor student progress
- Manage course discussions

### For Administrators
- Manage users (students, teachers, staff)
- Approve/reject course publications
- Generate system-wide reports
- View analytics and metrics
- System configuration

## 🏗️ Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

```
┌─────────────────────────────────────┐
│           API Layer (LMS.API)       │
│     Controllers, Middleware, etc.   │
└───────────────┬─────────────────────┘
                │
┌───────────────▼─────────────────────┐
│    Infrastructure (LMS.Infrastructure) │
│  DbContext, Repositories, Services   │
└───────────────┬─────────────────────┘
                │
┌───────────────▼─────────────────────┐
│    Application (LMS.Application)     │
│     DTOs, Service Interfaces        │
└───────────────┬─────────────────────┘
                │
┌───────────────▼─────────────────────┐
│        Domain (LMS.Domain)          │
│    Entities, Enums, Interfaces      │
└─────────────────────────────────────┘
```

## 🛠️ Tech Stack

### Backend
- **Framework**: ASP.NET Core 8.0 Web API
- **ORM**: Entity Framework Core 8.0
- **Database**: SQL Server
- **Authentication**: JWT Bearer + ASP.NET Core Identity
- **Password Hashing**: BCrypt.Net-Next
- **API Documentation**: Swagger/OpenAPI
- **Testing**: xUnit + Moq

### Frontend (Planned)
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: React Query + Context API
- **Routing**: React Router v6

### Additional
- **Real-time**: SignalR (planned)
- **Containerization**: Docker (planned)
- **CI/CD**: GitHub Actions (planned)

## 🚀 Getting Started

### Prerequisites
- .NET 8.0 SDK
- SQL Server (LocalDB, Express, or Full)
- Node.js 18+ (for frontend)
- Visual Studio 2022 / VS Code / Rider

### Backend Setup

1. **Clone the repository**
   ```bash
   cd /workspace
   ```

2. **Update Connection String**
   Edit `src/LMS.API/appsettings.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=localhost;Database=LMSDb;Trusted_Connection=true;TrustServerCertificate=true;MultipleActiveResultSets=true"
   }
   ```

3. **Apply Database Migrations**
   ```bash
   export PATH="/workspace/.dotnet:$PATH"
   dotnet ef database update --project src/LMS.Infrastructure --startup-project src/LMS.API
   ```

4. **Run the API**
   ```bash
   cd src/LMS.API
   dotnet run
   ```

5. **Access Swagger UI**
   Open browser: `https://localhost:7xxx/swagger`

### Frontend Setup (Coming Soon)

```bash
cd frontend
npm install
npm run dev
```

## 📝 API Endpoints

### Authentication
- `POST /api/Auth/register` - Register new user
- `POST /api/Auth/login` - Login user
- `POST /api/Auth/refresh-token` - Refresh JWT token
- `POST /api/Auth/revoke-token` - Revoke token

### Courses (Coming Soon)
- `GET /api/Courses` - Get all published courses
- `GET /api/Courses/{id}` - Get course details
- `POST /api/Courses` - Create course (Teacher)
- `PUT /api/Courses/{id}` - Update course
- `DELETE /api/Courses/{id}` - Delete course

### More endpoints coming soon...

## 🗄️ Database Schema

Key entities:
- **Users** - Multi-role authentication
- **Courses** - With approval workflow
- **Lessons** - Course content
- **Quizzes** - Auto-graded assessments
- **Assignments** - File-based submissions
- **Enrollments** - Student-course relationships
- **Certificates** - Auto-generated on completion
- **Discussions** - Threaded discussions

See `PROJECT_STATUS.md` for complete schema details.

## 🔐 Security

- JWT Bearer token authentication
- BCrypt password hashing
- Role-based authorization (Admin, Teacher, Student)
- CORS protection
- HTTPS enforcement

## 🧪 Testing

```bash
# Run all tests
dotnet test

# Run specific test project
dotnet test tests/LMS.Tests
```

## 📦 Docker Deployment (Coming Soon)

```bash
# Build and run with Docker Compose
docker-compose up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built as a demonstration of enterprise-level full-stack development skills.

## 📚 Documentation

- [Project Status & Next Steps](PROJECT_STATUS.md)
- [API Documentation](https://localhost:7xxx/swagger) (when running)

## 🎓 Learning Outcomes

This project demonstrates proficiency in:
- Clean Architecture & SOLID principles
- Repository & Unit of Work patterns
- Domain-Driven Design
- RESTful API design
- Entity Framework Core
- JWT Authentication
- Dependency Injection
- Unit Testing best practices
