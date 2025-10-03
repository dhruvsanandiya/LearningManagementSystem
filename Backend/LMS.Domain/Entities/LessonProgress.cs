using LMS.Domain.Common;

namespace LMS.Domain.Entities;

public class LessonProgress : BaseEntity
{
    public int EnrollmentId { get; set; }
    public int LessonId { get; set; }
    public bool IsCompleted { get; set; } = false;
    public DateTime? CompletedDate { get; set; }
    public int WatchTime { get; set; } = 0; // in seconds

    // Navigation properties
    public virtual Enrollment Enrollment { get; set; } = null!;
    public virtual Lesson Lesson { get; set; } = null!;
}

