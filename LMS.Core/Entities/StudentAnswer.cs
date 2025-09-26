using System.ComponentModel.DataAnnotations;

namespace LMS.Core.Entities;

public class StudentAnswer : BaseEntity
{
    public int QuizAttemptId { get; set; }
    
    public int QuestionId { get; set; }
    
    [Required]
    [MaxLength(1)]
    public string SelectedAnswer { get; set; } = string.Empty; // A, B, C, or D
    
    public bool IsCorrect { get; set; }
    
    // Navigation properties
    public virtual QuizAttempt QuizAttempt { get; set; } = null!;
    public virtual Question Question { get; set; } = null!;
}