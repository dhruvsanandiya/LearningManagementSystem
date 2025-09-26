using System.ComponentModel.DataAnnotations;

namespace LMS.Core.Entities;

public class Quiz : BaseEntity
{
    public int CourseId { get; set; }
    
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;
    
    [MaxLength(1000)]
    public string? Description { get; set; }
    
    public int TotalMarks { get; set; }
    
    public int PassingMarks { get; set; }
    
    public int TimeLimit { get; set; } // in minutes
    
    public int MaxAttempts { get; set; } = 3;
    
    public bool IsActive { get; set; } = true;
    
    // Navigation properties
    public virtual Course Course { get; set; } = null!;
    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
    public virtual ICollection<QuizAttempt> QuizAttempts { get; set; } = new List<QuizAttempt>();
}