using LMS.Domain.Entities;

namespace LMS.Application.Contracts.Persistence;

public interface IQuizAttemptRepository : IGenericRepository<QuizAttempt>
{
    Task<IReadOnlyList<QuizAttempt>> GetAttemptsByStudentAsync(string studentId);
    Task<IReadOnlyList<QuizAttempt>> GetAttemptsByQuizAsync(int quizId);
}

