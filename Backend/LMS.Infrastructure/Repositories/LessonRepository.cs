using LMS.Application.Contracts.Persistence;
using LMS.Domain.Entities;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class LessonRepository : GenericRepository<Lesson>, ILessonRepository
{
    public LessonRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<Lesson>> GetLessonsByCourseAsync(int courseId)
    {
        return await _context.Lessons
            .Where(l => l.CourseId == courseId)
            .OrderBy(l => l.OrderNumber)
            .ToListAsync();
    }
}

