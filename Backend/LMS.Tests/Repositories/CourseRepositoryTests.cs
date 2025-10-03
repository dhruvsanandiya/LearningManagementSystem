using LMS.Domain.Entities;
using LMS.Domain.Enums;
using LMS.Infrastructure.Data;
using LMS.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Xunit;
using FluentAssertions;

namespace LMS.Tests.Repositories;

public class CourseRepositoryTests : IDisposable
{
    private readonly ApplicationDbContext _context;
    private readonly CourseRepository _repository;

    public CourseRepositoryTests()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _context = new ApplicationDbContext(options);
        _repository = new CourseRepository(_context);
    }

    [Fact]
    public async Task GetPublishedCoursesAsync_ShouldReturnOnlyPublishedCourses()
    {
        // Arrange
        var category = new Category { Name = "Programming", Description = "Programming courses" };
        await _context.Categories.AddAsync(category);
        await _context.SaveChangesAsync();

        var courses = new List<Course>
        {
            new Course { Title = "Course 1", Description = "Desc 1", CategoryId = category.Id, TeacherId = "teacher1", Status = CourseStatus.Published },
            new Course { Title = "Course 2", Description = "Desc 2", CategoryId = category.Id, TeacherId = "teacher1", Status = CourseStatus.Draft },
            new Course { Title = "Course 3", Description = "Desc 3", CategoryId = category.Id, TeacherId = "teacher1", Status = CourseStatus.Published }
        };

        await _context.Courses.AddRangeAsync(courses);
        await _context.SaveChangesAsync();

        // Act
        var result = await _repository.GetPublishedCoursesAsync();

        // Assert
        result.Should().HaveCount(2);
        result.Should().OnlyContain(c => c.Status == CourseStatus.Published);
    }

    [Fact]
    public async Task GetCoursesByTeacherAsync_ShouldReturnTeacherCourses()
    {
        // Arrange
        var category = new Category { Name = "Programming", Description = "Programming courses" };
        await _context.Categories.AddAsync(category);
        await _context.SaveChangesAsync();

        var teacherId = "teacher1";
        var courses = new List<Course>
        {
            new Course { Title = "Course 1", Description = "Desc 1", CategoryId = category.Id, TeacherId = teacherId, Status = CourseStatus.Published },
            new Course { Title = "Course 2", Description = "Desc 2", CategoryId = category.Id, TeacherId = "teacher2", Status = CourseStatus.Published },
            new Course { Title = "Course 3", Description = "Desc 3", CategoryId = category.Id, TeacherId = teacherId, Status = CourseStatus.Draft }
        };

        await _context.Courses.AddRangeAsync(courses);
        await _context.SaveChangesAsync();

        // Act
        var result = await _repository.GetCoursesByTeacherAsync(teacherId);

        // Assert
        result.Should().HaveCount(2);
        result.Should().OnlyContain(c => c.TeacherId == teacherId);
    }

    public void Dispose()
    {
        _context.Database.EnsureDeleted();
        _context.Dispose();
    }
}

