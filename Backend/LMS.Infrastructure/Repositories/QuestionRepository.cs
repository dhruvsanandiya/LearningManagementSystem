using LMS.Application.Contracts.Persistence;
using LMS.Domain.Entities;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class QuestionRepository : GenericRepository<Question>, IQuestionRepository
{
    public QuestionRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<Question>> GetQuestionsByQuizAsync(int quizId)
    {
        return await _context.Questions
            .Where(q => q.QuizId == quizId)
            .ToListAsync();
    }
}

