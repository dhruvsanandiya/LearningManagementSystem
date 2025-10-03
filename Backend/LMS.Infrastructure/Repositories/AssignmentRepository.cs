using LMS.Application.Contracts.Persistence;
using LMS.Domain.Entities;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class AssignmentRepository : GenericRepository<Assignment>, IAssignmentRepository
{
    public AssignmentRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<Assignment>> GetAssignmentsByCourseAsync(int courseId)
    {
        return await _context.Assignments
            .Where(a => a.CourseId == courseId)
            .OrderBy(a => a.DueDate)
            .ToListAsync();
    }
}

