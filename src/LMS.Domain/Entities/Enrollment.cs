using LMS.Domain.Common;

namespace LMS.Domain.Entities;

public class Enrollment : BaseEntity
{
    public DateTime EnrolledDate { get; set; }
    public decimal Progress { get; set; } // 0-100
    public bool IsCompleted { get; set; }
    public DateTime? CompletedDate { get; set; }
    public decimal? Rating { get; set; } // 1-5
    public string? Review { get; set; }
    
    // Foreign keys
    public int CourseId { get; set; }
    public int StudentId { get; set; }
    
    // Navigation properties
    public Course Course { get; set; } = null!;
    public User Student { get; set; } = null!;
    public ICollection<LessonProgress> LessonProgresses { get; set; } = new List<LessonProgress>();
}
