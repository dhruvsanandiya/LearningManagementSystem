# 🚀 Quick Setup Guide - LMS Project

## Step-by-Step Installation Instructions

### Step 1: Prerequisites
Install the following software:
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) or SQL Server LocalDB
- [Visual Studio 2022](https://visualstudio.microsoft.com/) or [VS Code](https://code.visualstudio.com/)

### Step 2: Clone the Repository
```bash
git clone <your-repo-url>
cd LearningManagementSystem
```

### Step 3: Backend Setup

#### 3.1 Install EF Core Tools
```bash
dotnet tool install --global dotnet-ef
```

#### 3.2 Navigate to Backend
```bash
cd Backend
```

#### 3.3 Restore NuGet Packages
```bash
dotnet restore
```

#### 3.4 Update Database Connection String
Edit `Backend/LMS.API/appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=LearningManagementSystem;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True"
  }
}
```

For full SQL Server, use:
```json
"DefaultConnection": "Server=localhost;Database=LearningManagementSystem;User Id=sa;Password=YourPassword;TrustServerCertificate=True"
```

#### 3.5 Create Database Migration
```bash
cd LMS.API
dotnet ef migrations add InitialCreate --project ../LMS.Infrastructure --startup-project .
```

#### 3.6 Update Database
```bash
dotnet ef database update --project ../LMS.Infrastructure --startup-project .
```

#### 3.7 Run Backend API
```bash
dotnet run
```

✅ Backend should now be running at `https://localhost:7001`
✅ Open Swagger UI: `https://localhost:7001/swagger`

### Step 4: Frontend Setup

#### 4.1 Navigate to Frontend (open new terminal)
```bash
cd Frontend
```

#### 4.2 Install Dependencies
```bash
npm install
```

#### 4.3 Start Development Server
```bash
npm run dev
```

✅ Frontend should now be running at `http://localhost:3000`

### Step 5: Test the Application

#### 5.1 Create Test User
1. Open browser: `http://localhost:3000`
2. Click "Register"
3. Fill in the form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Password: Test@123
   - Role: Student
4. Click "Create Account"

#### 5.2 Test Login
1. Use the credentials you just created
2. You should be redirected to the Dashboard

#### 5.3 Create Admin User (via Swagger)
1. Open Swagger: `https://localhost:7001/swagger`
2. Use `/api/Auth/register` endpoint
3. Create user with role "Admin"
4. Use `/api/Auth/assign-role` to assign additional roles

### Step 6: Test Course Creation (Teacher Role)

1. Register with role "Teacher"
2. Login
3. Navigate to "Create Course"
4. Fill in course details
5. Submit

### Step 7: Verify Database

#### Using SQL Server Management Studio (SSMS):
```sql
USE LearningManagementSystem;
GO

-- View all tables
SELECT * FROM sys.tables;

-- View users
SELECT * FROM AspNetUsers;

-- View courses
SELECT * FROM Courses;
```

#### Using Visual Studio SQL Server Object Explorer:
1. View → SQL Server Object Explorer
2. Expand (localdb)\mssqllocaldb
3. Expand Databases → LearningManagementSystem
4. Browse tables

## 🐳 Docker Setup (Alternative)

### Run Everything with Docker Compose
```bash
# From project root
docker-compose up --build
```

This will start:
- SQL Server on port 1433
- Backend API on port 7001
- Frontend on port 3000

## 🧪 Running Tests

```bash
cd Backend/LMS.Tests
dotnet test
```

## 🔧 Troubleshooting

### Issue: Database Connection Error
**Solution**: Check SQL Server is running
```bash
# For LocalDB
sqllocaldb info
sqllocaldb start mssqllocaldb
```

### Issue: Migration Error
**Solution**: Delete existing migrations and recreate
```bash
cd Backend/LMS.Infrastructure
rm -rf Migrations
cd ../LMS.API
dotnet ef migrations add InitialCreate --project ../LMS.Infrastructure
dotnet ef database update --project ../LMS.Infrastructure
```

### Issue: CORS Error in Browser
**Solution**: Check API is running and CORS is configured in Program.cs

### Issue: JWT Token Invalid
**Solution**: Verify JWT settings match in appsettings.json

### Issue: Port Already in Use
**Solution**: Change port in configuration
- Backend: Edit `Properties/launchSettings.json`
- Frontend: Edit `vite.config.js`

## 📱 Testing Different Roles

### Admin User
- Can approve/reject courses
- Can manage all users
- Access to admin dashboard

### Teacher User
- Can create courses
- Can manage own courses
- Can grade assignments

### Student User
- Can enroll in courses
- Can view lessons
- Can submit assignments
- Can take quizzes

## 🎯 Next Steps

1. ✅ Basic setup complete
2. 📝 Add more controllers (Lessons, Quizzes, Assignments)
3. 🎨 Enhance frontend UI
4. 🔔 Implement notifications
5. 📊 Add reporting features
6. 📧 Email integration
7. 💳 Payment gateway (if needed)
8. 📱 Mobile responsive improvements

## 💡 Tips

- Use Swagger for API testing
- Check browser console for errors
- Monitor API logs in terminal
- Use React DevTools for debugging
- Keep backend and frontend terminals open

## 🆘 Need Help?

Common commands:
```bash
# Restore packages
dotnet restore

# Build solution
dotnet build

# Run API
dotnet run --project Backend/LMS.API

# Install frontend deps
cd Frontend && npm install

# Run frontend
npm run dev

# Run tests
dotnet test
```

---

✨ **You're all set! Happy coding!** ✨

