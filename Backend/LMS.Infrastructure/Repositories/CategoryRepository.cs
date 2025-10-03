using LMS.Application.Contracts.Persistence;
using LMS.Domain.Entities;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
{
    public CategoryRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<Category>> GetCategoriesWithCoursesAsync()
    {
        return await _context.Categories
            .Include(c => c.Courses)
            .ToListAsync();
    }
}

