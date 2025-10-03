using LMS.Application.DTOs.Courses;

namespace LMS.Application.Interfaces;

public interface ICourseService
{
    Task<IEnumerable<CourseDto>> GetAllCoursesAsync();
    Task<IEnumerable<CourseDto>> GetPublishedCoursesAsync();
    Task<CourseDto?> GetCourseByIdAsync(int id);
    Task<CourseDto> CreateCourseAsync(CreateCourseDto createCourseDto, int teacherId);
    Task<CourseDto> UpdateCourseAsync(UpdateCourseDto updateCourseDto);
    Task<bool> DeleteCourseAsync(int id);
    Task<bool> ApproveCourseAsync(int id, int adminId);
    Task<bool> RejectCourseAsync(int id, int adminId);
    Task<IEnumerable<CourseDto>> GetCoursesByTeacherAsync(int teacherId);
    Task<IEnumerable<CourseDto>> GetCoursesByCategoryAsync(int categoryId);
}
