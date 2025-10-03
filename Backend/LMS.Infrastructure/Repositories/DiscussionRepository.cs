using LMS.Application.Contracts.Persistence;
using LMS.Domain.Entities;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class DiscussionRepository : GenericRepository<Discussion>, IDiscussionRepository
{
    public DiscussionRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<Discussion>> GetDiscussionsByCourseAsync(int courseId)
    {
        return await _context.Discussions
            .Include(d => d.User)
            .Include(d => d.Replies)
            .Where(d => d.CourseId == courseId && d.ParentId == null)
            .OrderByDescending(d => d.CreatedAt)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<Discussion>> GetRepliesByParentAsync(int parentId)
    {
        return await _context.Discussions
            .Include(d => d.User)
            .Where(d => d.ParentId == parentId)
            .OrderBy(d => d.CreatedAt)
            .ToListAsync();
    }
}

