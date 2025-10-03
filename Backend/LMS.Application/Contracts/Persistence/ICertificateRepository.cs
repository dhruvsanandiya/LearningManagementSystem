using LMS.Domain.Entities;

namespace LMS.Application.Contracts.Persistence;

public interface ICertificateRepository : IGenericRepository<Certificate>
{
    Task<IReadOnlyList<Certificate>> GetCertificatesByStudentAsync(string studentId);
    Task<Certificate?> GetCertificateByCourseAndStudentAsync(int courseId, string studentId);
}

