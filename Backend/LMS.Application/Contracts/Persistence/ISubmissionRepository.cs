using LMS.Domain.Entities;

namespace LMS.Application.Contracts.Persistence;

public interface ISubmissionRepository : IGenericRepository<Submission>
{
    Task<IReadOnlyList<Submission>> GetSubmissionsByStudentAsync(string studentId);
    Task<IReadOnlyList<Submission>> GetSubmissionsByAssignmentAsync(int assignmentId);
    Task<Submission?> GetSubmissionByStudentAndAssignmentAsync(string studentId, int assignmentId);
}

