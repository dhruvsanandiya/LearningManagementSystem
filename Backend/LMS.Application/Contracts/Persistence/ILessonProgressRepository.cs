using LMS.Domain.Entities;

namespace LMS.Application.Contracts.Persistence;

public interface ILessonProgressRepository : IGenericRepository<LessonProgress>
{
    Task<IReadOnlyList<LessonProgress>> GetProgressByEnrollmentAsync(int enrollmentId);
}

