using LMS.Application.Contracts.Persistence;
using LMS.Domain.Entities;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class SubmissionRepository : GenericRepository<Submission>, ISubmissionRepository
{
    public SubmissionRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<Submission>> GetSubmissionsByStudentAsync(string studentId)
    {
        return await _context.Submissions
            .Include(s => s.Assignment)
            .ThenInclude(a => a.Course)
            .Where(s => s.StudentId == studentId)
            .OrderByDescending(s => s.SubmittedDate)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<Submission>> GetSubmissionsByAssignmentAsync(int assignmentId)
    {
        return await _context.Submissions
            .Include(s => s.Student)
            .Where(s => s.AssignmentId == assignmentId)
            .OrderByDescending(s => s.SubmittedDate)
            .ToListAsync();
    }

    public async Task<Submission?> GetSubmissionByStudentAndAssignmentAsync(string studentId, int assignmentId)
    {
        return await _context.Submissions
            .Include(s => s.Assignment)
            .FirstOrDefaultAsync(s => s.StudentId == studentId && s.AssignmentId == assignmentId);
    }
}

