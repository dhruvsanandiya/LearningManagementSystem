using LMS.Domain.Common;
using LMS.Domain.Enums;

namespace LMS.Domain.Entities;

public class Course : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ThumbnailUrl { get; set; }
    public DifficultyLevel DifficultyLevel { get; set; } = DifficultyLevel.Beginner;
    public decimal Price { get; set; } = 0;
    public CourseStatus Status { get; set; } = CourseStatus.Draft;
    public int CategoryId { get; set; }
    public string TeacherId { get; set; } = string.Empty;
    public int Duration { get; set; } // in hours
    public string? Tags { get; set; }

    // Navigation properties
    public virtual Category Category { get; set; } = null!;
    public virtual ApplicationUser Teacher { get; set; } = null!;
    public virtual ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
    public virtual ICollection<Quiz> Quizzes { get; set; } = new List<Quiz>();
    public virtual ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();
    public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
    public virtual ICollection<Discussion> Discussions { get; set; } = new List<Discussion>();
    public virtual ICollection<Certificate> Certificates { get; set; } = new List<Certificate>();
}

