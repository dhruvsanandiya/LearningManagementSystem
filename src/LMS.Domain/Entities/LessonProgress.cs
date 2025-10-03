using LMS.Domain.Common;

namespace LMS.Domain.Entities;

public class LessonProgress : BaseEntity
{
    public bool IsCompleted { get; set; }
    public int WatchedDuration { get; set; } // in seconds
    public DateTime? CompletedAt { get; set; }
    
    // Foreign keys
    public int EnrollmentId { get; set; }
    public int LessonId { get; set; }
    
    // Navigation properties
    public Enrollment Enrollment { get; set; } = null!;
    public Lesson Lesson { get; set; } = null!;
}
