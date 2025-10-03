using LMS.Application.Contracts.Persistence;
using LMS.Infrastructure.Data;

namespace LMS.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    private ICategoryRepository? _categoryRepository;
    private ICourseRepository? _courseRepository;
    private ILessonRepository? _lessonRepository;
    private IQuizRepository? _quizRepository;
    private IQuestionRepository? _questionRepository;
    private IQuizAttemptRepository? _quizAttemptRepository;
    private IAssignmentRepository? _assignmentRepository;
    private ISubmissionRepository? _submissionRepository;
    private IEnrollmentRepository? _enrollmentRepository;
    private ILessonProgressRepository? _lessonProgressRepository;
    private ICertificateRepository? _certificateRepository;
    private IDiscussionRepository? _discussionRepository;

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
    }

    public ICategoryRepository Categories => _categoryRepository ??= new CategoryRepository(_context);
    public ICourseRepository Courses => _courseRepository ??= new CourseRepository(_context);
    public ILessonRepository Lessons => _lessonRepository ??= new LessonRepository(_context);
    public IQuizRepository Quizzes => _quizRepository ??= new QuizRepository(_context);
    public IQuestionRepository Questions => _questionRepository ??= new QuestionRepository(_context);
    public IQuizAttemptRepository QuizAttempts => _quizAttemptRepository ??= new QuizAttemptRepository(_context);
    public IAssignmentRepository Assignments => _assignmentRepository ??= new AssignmentRepository(_context);
    public ISubmissionRepository Submissions => _submissionRepository ??= new SubmissionRepository(_context);
    public IEnrollmentRepository Enrollments => _enrollmentRepository ??= new EnrollmentRepository(_context);
    public ILessonProgressRepository LessonProgresses => _lessonProgressRepository ??= new LessonProgressRepository(_context);
    public ICertificateRepository Certificates => _certificateRepository ??= new CertificateRepository(_context);
    public IDiscussionRepository Discussions => _discussionRepository ??= new DiscussionRepository(_context);

    public async Task<int> SaveAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}

