using LMS.Application.Contracts.Persistence;
using LMS.Domain.Entities;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class EnrollmentRepository : GenericRepository<Enrollment>, IEnrollmentRepository
{
    public EnrollmentRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<Enrollment>> GetEnrollmentsByStudentAsync(string studentId)
    {
        return await _context.Enrollments
            .Include(e => e.Course)
            .ThenInclude(c => c.Category)
            .Include(e => e.Course.Teacher)
            .Where(e => e.StudentId == studentId)
            .OrderByDescending(e => e.EnrolledDate)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<Enrollment>> GetEnrollmentsByCourseAsync(int courseId)
    {
        return await _context.Enrollments
            .Include(e => e.Student)
            .Where(e => e.CourseId == courseId)
            .OrderByDescending(e => e.EnrolledDate)
            .ToListAsync();
    }

    public async Task<Enrollment?> GetEnrollmentByStudentAndCourseAsync(string studentId, int courseId)
    {
        return await _context.Enrollments
            .Include(e => e.Course)
            .Include(e => e.LessonProgresses)
            .FirstOrDefaultAsync(e => e.StudentId == studentId && e.CourseId == courseId);
    }

    public async Task<bool> IsStudentEnrolledAsync(string studentId, int courseId)
    {
        return await _context.Enrollments
            .AnyAsync(e => e.StudentId == studentId && e.CourseId == courseId);
    }
}

