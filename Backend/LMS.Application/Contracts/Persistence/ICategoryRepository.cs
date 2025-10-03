using LMS.Domain.Entities;

namespace LMS.Application.Contracts.Persistence;

public interface ICategoryRepository : IGenericRepository<Category>
{
    Task<IReadOnlyList<Category>> GetCategoriesWithCoursesAsync();
}

