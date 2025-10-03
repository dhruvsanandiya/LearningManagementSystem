using LMS.Domain.Entities;

namespace LMS.Application.Contracts.Persistence;

public interface ILessonRepository : IGenericRepository<Lesson>
{
    Task<IReadOnlyList<Lesson>> GetLessonsByCourseAsync(int courseId);
}

