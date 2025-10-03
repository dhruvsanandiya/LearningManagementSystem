using LMS.Domain.Entities;
using LMS.Domain.Enums;

namespace LMS.Application.Contracts.Persistence;

public interface ICourseRepository : IGenericRepository<Course>
{
    Task<IReadOnlyList<Course>> GetCoursesByTeacherAsync(string teacherId);
    Task<IReadOnlyList<Course>> GetPublishedCoursesAsync();
    Task<IReadOnlyList<Course>> GetCoursesByCategoryAsync(int categoryId);
    Task<Course?> GetCourseWithDetailsAsync(int courseId);
    Task<IReadOnlyList<Course>> GetCoursesByStatusAsync(CourseStatus status);
}

