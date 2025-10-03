using LMS.Application.Contracts.Persistence;
using LMS.Domain.Entities;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class LessonProgressRepository : GenericRepository<LessonProgress>, ILessonProgressRepository
{
    public LessonProgressRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<LessonProgress>> GetProgressByEnrollmentAsync(int enrollmentId)
    {
        return await _context.LessonProgresses
            .Include(lp => lp.Lesson)
            .Where(lp => lp.EnrollmentId == enrollmentId)
            .ToListAsync();
    }
}

