using LMS.Domain.Common;

namespace LMS.Domain.Entities;

public class Quiz : BaseEntity
{
    public int CourseId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int TotalMarks { get; set; }
    public int PassingMarks { get; set; }
    public int TimeLimit { get; set; } // in minutes
    public bool IsActive { get; set; } = true;

    // Navigation properties
    public virtual Course Course { get; set; } = null!;
    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
    public virtual ICollection<QuizAttempt> QuizAttempts { get; set; } = new List<QuizAttempt>();
}

