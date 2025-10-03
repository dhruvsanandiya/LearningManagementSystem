# 📚 Learning Management System (LMS)

An enterprise-level Learning Management System built with modern technologies, featuring Clean Architecture, JWT authentication, real-time chat, and a beautiful React frontend.

## 🚀 Tech Stack

### Backend
- **ASP.NET Core 8.0 Web API** with Clean Architecture
- **Entity Framework Core** with SQL Server
- **ASP.NET Core Identity** for authentication
- **JWT Bearer Authentication** for secure API access
- **SignalR** for real-time communication
- **Repository Pattern** & **Unit of Work** for data access
- **xUnit** & **Moq** for unit testing

### Frontend
- **React 19** with component-based architecture
- **Vite** for fast development and building
- **TailwindCSS** for modern, responsive UI
- **Zustand** for state management
- **Axios** for API communication
- **React Router** for navigation
- **SignalR Client** for real-time features

### Database
- **SQL Server** with EF Core migrations
- Support for stored procedures and views
- Comprehensive schema with relationships

## 📁 Project Structure

```
LearningManagementSystem/
├── Backend/
│   ├── LMS.API/                    # Presentation Layer (Controllers, Hubs)
│   ├── LMS.Application/            # Application Layer (DTOs, Interfaces, Services)
│   ├── LMS.Domain/                 # Domain Layer (Entities, Enums)
│   ├── LMS.Infrastructure/         # Infrastructure Layer (DbContext, Repositories)
│   └── LMS.Tests/                  # Unit Tests
├── Frontend/
│   ├── src/
│   │   ├── components/             # Reusable React components
│   │   ├── pages/                  # Page components
│   │   ├── services/               # API services
│   │   ├── store/                  # State management
│   │   └── App.jsx                 # Main app component
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🎯 Features

### User Roles
- **Admin**: Manage users, approve courses, generate reports
- **Teacher**: Create/manage courses, upload materials, grade assignments
- **Student**: Enroll in courses, track progress, earn certificates

### Core Modules
1. **Authentication & Authorization**
   - Register/Login with JWT
   - Role-based access control
   - Profile management

2. **Course Management**
   - Create, edit, delete courses
   - Course approval workflow
   - Categories and difficulty levels

3. **Lesson & Content Management**
   - Upload videos, PDFs, PPTs
   - Lesson sequencing
   - Access control for enrolled students

4. **Quiz & Assignment System**
   - Auto-graded MCQ quizzes
   - File submission assignments
   - Teacher grading and feedback

5. **Enrollment & Progress Tracking**
   - Student enrollment
   - Progress bar tracking
   - Completion certificates

6. **Real-time Chat & Discussions**
   - SignalR-powered chat
   - Course-based discussion threads

## 🛠️ Getting Started

### Prerequisites
- .NET 8.0 SDK
- Node.js 18+ and npm
- SQL Server (LocalDB or full instance)
- Visual Studio 2022 or VS Code

### Backend Setup

1. **Navigate to Backend directory**
   ```bash
   cd Backend
   ```

2. **Update database connection string**
   Edit `LMS.API/appsettings.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=LearningManagementSystem;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True"
   }
   ```

3. **Install dependencies and run migrations**
   ```bash
   dotnet restore
   cd LMS.API
   dotnet ef migrations add InitialCreate --project ../LMS.Infrastructure
   dotnet ef database update --project ../LMS.Infrastructure
   ```

4. **Run the API**
   ```bash
   dotnet run
   ```
   API will be available at: `https://localhost:7001`
   Swagger UI: `https://localhost:7001/swagger`

### Frontend Setup

1. **Navigate to Frontend directory**
   ```bash
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Update API URL (if needed)**
   Edit `src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'https://localhost:7001/api'
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Frontend will be available at: `http://localhost:3000`

## 🧪 Running Tests

```bash
cd Backend/LMS.Tests
dotnet test
```

## 📊 Database Schema

### Main Entities
- **Users**: ApplicationUser (extends IdentityUser)
- **Categories**: Course categories
- **Courses**: Course information
- **Lessons**: Course lessons/content
- **Quizzes**: Quiz definitions
- **Questions**: Quiz questions
- **QuizAttempts**: Student quiz attempts
- **Assignments**: Assignment details
- **Submissions**: Student submissions
- **Enrollments**: Student course enrollments
- **LessonProgress**: Lesson completion tracking
- **Certificates**: Course completion certificates
- **Discussions**: Course discussions

## 🔐 API Authentication

The API uses JWT Bearer authentication. To access protected endpoints:

1. Register/Login to get a token
2. Include token in request headers:
   ```
   Authorization: Bearer <your-token>
   ```

### Sample API Endpoints

#### Authentication
- `POST /api/Auth/register` - Register new user
- `POST /api/Auth/login` - Login
- `POST /api/Auth/assign-role` - Assign role (Admin only)

#### Courses
- `GET /api/Courses` - Get all published courses
- `GET /api/Courses/{id}` - Get course by ID
- `POST /api/Courses` - Create course (Teacher/Admin)
- `GET /api/Courses/my-courses` - Get teacher's courses
- `PUT /api/Courses/{id}/status` - Update course status (Admin)

## 🎨 UI Features

- **Modern, Responsive Design**: Mobile-first approach with TailwindCSS
- **Role-based Navigation**: Dynamic menu based on user role
- **Protected Routes**: Automatic redirection for unauthorized access
- **Real-time Updates**: SignalR integration for live chat
- **State Persistence**: Login state persists across sessions

## 📦 Building for Production

### Backend
```bash
cd Backend/LMS.API
dotnet publish -c Release -o ./publish
```

### Frontend
```bash
cd Frontend
npm run build
```
Build output will be in `Frontend/dist/`

## 🐳 Docker Support

### Dockerfile (Backend)
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["LMS.API/LMS.API.csproj", "LMS.API/"]
COPY ["LMS.Application/LMS.Application.csproj", "LMS.Application/"]
COPY ["LMS.Domain/LMS.Domain.csproj", "LMS.Domain/"]
COPY ["LMS.Infrastructure/LMS.Infrastructure.csproj", "LMS.Infrastructure/"]
RUN dotnet restore "LMS.API/LMS.API.csproj"
COPY . .
WORKDIR "/src/LMS.API"
RUN dotnet build "LMS.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "LMS.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LMS.API.dll"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=YourStrong@Passw0rd
    ports:
      - "1433:1433"

  api:
    build:
      context: ./Backend
      dockerfile: Dockerfile
    ports:
      - "7001:80"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - ConnectionStrings__DefaultConnection=Server=sqlserver;Database=LearningManagementSystem;User Id=sa;Password=YourStrong@Passw0rd;TrustServerCertificate=True
    depends_on:
      - sqlserver

  frontend:
    build:
      context: ./Frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"
```

## 🔧 Configuration

### JWT Settings (appsettings.json)
```json
{
  "JWT": {
    "Secret": "YourSuperSecretKeyForJWTTokenGeneration123456789",
    "ValidIssuer": "LMS_API",
    "ValidAudience": "LMS_Client"
  }
}
```

### CORS Settings
Frontend origins are configured in `Program.cs`:
```csharp
policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
```

## 📝 Resume-Worthy Keywords

This project demonstrates expertise in:
- ✅ Clean Architecture & SOLID Principles
- ✅ Repository Pattern & Unit of Work
- ✅ Entity Framework Core with SQL Server
- ✅ JWT Authentication & Role-Based Access Control (RBAC)
- ✅ SignalR for Real-time Communication
- ✅ RESTful API Design
- ✅ Unit Testing with xUnit & Moq
- ✅ React 19 with Modern Hooks
- ✅ State Management with Zustand
- ✅ Responsive UI with TailwindCSS
- ✅ API Integration with Axios
- ✅ Docker Containerization
- ✅ Git Version Control

## 🤝 Contributing

This is a learning project. Feel free to fork and extend with additional features!

## 📄 License

MIT License - feel free to use this project for learning and portfolio purposes.

## 👨‍💻 Developer

Built with ❤️ as an enterprise-level portfolio project demonstrating full-stack development skills.

---

**Note**: Remember to update JWT secrets, database passwords, and connection strings before deploying to production!

