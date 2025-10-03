using LMS.Domain.Common;

namespace LMS.Domain.Entities;

public class QuizAttempt : BaseEntity
{
    public int Score { get; set; }
    public int TotalMarks { get; set; }
    public bool IsPassed { get; set; }
    public DateTime StartedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public string? Answers { get; set; } // JSON: { questionId: selectedAnswer }
    
    // Foreign keys
    public int QuizId { get; set; }
    public int StudentId { get; set; }
    
    // Navigation properties
    public Quiz Quiz { get; set; } = null!;
    public User Student { get; set; } = null!;
}
