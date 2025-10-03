using LMS.Domain.Entities;

namespace LMS.Application.Contracts.Persistence;

public interface IQuizRepository : IGenericRepository<Quiz>
{
    Task<IReadOnlyList<Quiz>> GetQuizzesByCourseAsync(int courseId);
    Task<Quiz?> GetQuizWithQuestionsAsync(int quizId);
}

