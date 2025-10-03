using LMS.Application.Contracts.Persistence;
using LMS.Domain.Entities;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class QuizRepository : GenericRepository<Quiz>, IQuizRepository
{
    public QuizRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<Quiz>> GetQuizzesByCourseAsync(int courseId)
    {
        return await _context.Quizzes
            .Where(q => q.CourseId == courseId)
            .ToListAsync();
    }

    public async Task<Quiz?> GetQuizWithQuestionsAsync(int quizId)
    {
        return await _context.Quizzes
            .Include(q => q.Questions)
            .FirstOrDefaultAsync(q => q.Id == quizId);
    }
}

