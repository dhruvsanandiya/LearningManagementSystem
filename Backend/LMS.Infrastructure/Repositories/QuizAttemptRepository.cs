using LMS.Application.Contracts.Persistence;
using LMS.Domain.Entities;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class QuizAttemptRepository : GenericRepository<QuizAttempt>, IQuizAttemptRepository
{
    public QuizAttemptRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<QuizAttempt>> GetAttemptsByStudentAsync(string studentId)
    {
        return await _context.QuizAttempts
            .Include(qa => qa.Quiz)
            .Where(qa => qa.StudentId == studentId)
            .OrderByDescending(qa => qa.AttemptDate)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<QuizAttempt>> GetAttemptsByQuizAsync(int quizId)
    {
        return await _context.QuizAttempts
            .Include(qa => qa.Student)
            .Where(qa => qa.QuizId == quizId)
            .OrderByDescending(qa => qa.Score)
            .ToListAsync();
    }
}

