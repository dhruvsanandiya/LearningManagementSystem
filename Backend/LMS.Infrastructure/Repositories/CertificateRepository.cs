using LMS.Application.Contracts.Persistence;
using LMS.Domain.Entities;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class CertificateRepository : GenericRepository<Certificate>, ICertificateRepository
{
    public CertificateRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<Certificate>> GetCertificatesByStudentAsync(string studentId)
    {
        return await _context.Certificates
            .Include(c => c.Course)
            .Where(c => c.StudentId == studentId)
            .OrderByDescending(c => c.IssueDate)
            .ToListAsync();
    }

    public async Task<Certificate?> GetCertificateByCourseAndStudentAsync(int courseId, string studentId)
    {
        return await _context.Certificates
            .Include(c => c.Course)
            .FirstOrDefaultAsync(c => c.CourseId == courseId && c.StudentId == studentId);
    }
}

