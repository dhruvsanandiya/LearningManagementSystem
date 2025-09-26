namespace LMS.Core.Entities;

public class QuizAttempt : BaseEntity
{
    public int QuizId { get; set; }
    
    public string StudentId { get; set; } = string.Empty;
    
    public DateTime StartTime { get; set; } = DateTime.UtcNow;
    
    public DateTime? EndTime { get; set; }
    
    public int Score { get; set; }
    
    public int TotalQuestions { get; set; }
    
    public int CorrectAnswers { get; set; }
    
    public bool IsCompleted { get; set; } = false;
    
    public int AttemptNumber { get; set; }
    
    // Navigation properties
    public virtual Quiz Quiz { get; set; } = null!;
    public virtual ApplicationUser Student { get; set; } = null!;
    public virtual ICollection<StudentAnswer> StudentAnswers { get; set; } = new List<StudentAnswer>();
}