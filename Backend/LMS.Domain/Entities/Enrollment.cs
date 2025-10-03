using LMS.Domain.Common;

namespace LMS.Domain.Entities;

public class Enrollment : BaseEntity
{
    public int CourseId { get; set; }
    public string StudentId { get; set; } = string.Empty;
    public DateTime EnrolledDate { get; set; } = DateTime.UtcNow;
    public decimal Progress { get; set; } = 0; // Percentage
    public bool IsCompleted { get; set; } = false;
    public DateTime? CompletedDate { get; set; }

    // Navigation properties
    public virtual Course Course { get; set; } = null!;
    public virtual ApplicationUser Student { get; set; } = null!;
    public virtual ICollection<LessonProgress> LessonProgresses { get; set; } = new List<LessonProgress>();
}

