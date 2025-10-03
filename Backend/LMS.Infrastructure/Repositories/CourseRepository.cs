using LMS.Application.Contracts.Persistence;
using LMS.Domain.Entities;
using LMS.Domain.Enums;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class CourseRepository : GenericRepository<Course>, ICourseRepository
{
    public CourseRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<Course>> GetCoursesByTeacherAsync(string teacherId)
    {
        return await _context.Courses
            .Include(c => c.Category)
            .Include(c => c.Lessons)
            .Where(c => c.TeacherId == teacherId)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<Course>> GetPublishedCoursesAsync()
    {
        return await _context.Courses
            .Include(c => c.Category)
            .Include(c => c.Teacher)
            .Where(c => c.Status == CourseStatus.Published)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<Course>> GetCoursesByCategoryAsync(int categoryId)
    {
        return await _context.Courses
            .Include(c => c.Teacher)
            .Where(c => c.CategoryId == categoryId && c.Status == CourseStatus.Published)
            .ToListAsync();
    }

    public async Task<Course?> GetCourseWithDetailsAsync(int courseId)
    {
        return await _context.Courses
            .Include(c => c.Category)
            .Include(c => c.Teacher)
            .Include(c => c.Lessons)
            .Include(c => c.Quizzes)
            .Include(c => c.Assignments)
            .FirstOrDefaultAsync(c => c.Id == courseId);
    }

    public async Task<IReadOnlyList<Course>> GetCoursesByStatusAsync(CourseStatus status)
    {
        return await _context.Courses
            .Include(c => c.Category)
            .Include(c => c.Teacher)
            .Where(c => c.Status == status)
            .ToListAsync();
    }
}

