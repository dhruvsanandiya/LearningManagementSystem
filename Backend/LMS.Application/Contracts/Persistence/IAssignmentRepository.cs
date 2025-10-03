using LMS.Domain.Entities;

namespace LMS.Application.Contracts.Persistence;

public interface IAssignmentRepository : IGenericRepository<Assignment>
{
    Task<IReadOnlyList<Assignment>> GetAssignmentsByCourseAsync(int courseId);
}

