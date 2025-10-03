using LMS.Domain.Entities;

namespace LMS.Application.Contracts.Persistence;

public interface IQuestionRepository : IGenericRepository<Question>
{
    Task<IReadOnlyList<Question>> GetQuestionsByQuizAsync(int quizId);
}

