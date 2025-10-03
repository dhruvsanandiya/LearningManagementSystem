using LMS.Domain.Common;

namespace LMS.Domain.Entities;

public class QuizAttempt : BaseEntity
{
    public int QuizId { get; set; }
    public string StudentId { get; set; } = string.Empty;
    public int Score { get; set; }
    public int TotalQuestions { get; set; }
    public bool IsPassed { get; set; }
    public DateTime AttemptDate { get; set; } = DateTime.UtcNow;
    public string? Answers { get; set; } // JSON string of answers

    // Navigation properties
    public virtual Quiz Quiz { get; set; } = null!;
    public virtual ApplicationUser Student { get; set; } = null!;
}

