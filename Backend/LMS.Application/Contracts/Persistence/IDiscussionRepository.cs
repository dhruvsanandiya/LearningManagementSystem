using LMS.Domain.Entities;

namespace LMS.Application.Contracts.Persistence;

public interface IDiscussionRepository : IGenericRepository<Discussion>
{
    Task<IReadOnlyList<Discussion>> GetDiscussionsByCourseAsync(int courseId);
    Task<IReadOnlyList<Discussion>> GetRepliesByParentAsync(int parentId);
}

