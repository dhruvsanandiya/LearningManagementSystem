namespace LMS.Application.Contracts.Persistence;

public interface IUnitOfWork : IDisposable
{
    ICategoryRepository Categories { get; }
    ICourseRepository Courses { get; }
    ILessonRepository Lessons { get; }
    IQuizRepository Quizzes { get; }
    IQuestionRepository Questions { get; }
    IQuizAttemptRepository QuizAttempts { get; }
    IAssignmentRepository Assignments { get; }
    ISubmissionRepository Submissions { get; }
    IEnrollmentRepository Enrollments { get; }
    ILessonProgressRepository LessonProgresses { get; }
    ICertificateRepository Certificates { get; }
    IDiscussionRepository Discussions { get; }
    
    Task<int> SaveAsync();
}

