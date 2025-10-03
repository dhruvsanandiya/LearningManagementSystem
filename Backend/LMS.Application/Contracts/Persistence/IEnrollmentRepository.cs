using LMS.Domain.Entities;

namespace LMS.Application.Contracts.Persistence;

public interface IEnrollmentRepository : IGenericRepository<Enrollment>
{
    Task<IReadOnlyList<Enrollment>> GetEnrollmentsByStudentAsync(string studentId);
    Task<IReadOnlyList<Enrollment>> GetEnrollmentsByCourseAsync(int courseId);
    Task<Enrollment?> GetEnrollmentByStudentAndCourseAsync(string studentId, int courseId);
    Task<bool> IsStudentEnrolledAsync(string studentId, int courseId);
}

