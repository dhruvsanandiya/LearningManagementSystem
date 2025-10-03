using LMS.Domain.Common;

namespace LMS.Domain.Entities;

public class Quiz : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int TotalMarks { get; set; }
    public int PassingMarks { get; set; }
    public int Duration { get; set; } // in minutes
    public bool IsRandomized { get; set; }
    public int MaxAttempts { get; set; } = 3;
    public DateTime? AvailableFrom { get; set; }
    public DateTime? AvailableUntil { get; set; }
    
    // Foreign key
    public int CourseId { get; set; }
    
    // Navigation properties
    public Course Course { get; set; } = null!;
    public ICollection<Question> Questions { get; set; } = new List<Question>();
    public ICollection<QuizAttempt> QuizAttempts { get; set; } = new List<QuizAttempt>();
}
