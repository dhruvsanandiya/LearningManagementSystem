using LMS.Domain.Common;
using LMS.Domain.Enums;

namespace LMS.Domain.Entities;

public class Course : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ThumbnailUrl { get; set; }
    public string? VideoPreviewUrl { get; set; }
    public DifficultyLevel DifficultyLevel { get; set; }
    public CourseStatus Status { get; set; }
    public decimal Price { get; set; }
    public int Duration { get; set; } // in hours
    public string? Prerequisites { get; set; }
    public string? LearningObjectives { get; set; }
    public bool IsFeatured { get; set; }
    public DateTime? PublishedAt { get; set; }
    public int MaxStudents { get; set; } = 0; // 0 = unlimited
    
    // Foreign keys
    public int TeacherId { get; set; }
    public int CategoryId { get; set; }
    
    // Navigation properties
    public User Teacher { get; set; } = null!;
    public Category Category { get; set; } = null!;
    public ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
    public ICollection<Quiz> Quizzes { get; set; } = new List<Quiz>();
    public ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();
    public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
    public ICollection<Certificate> Certificates { get; set; } = new List<Certificate>();
    public ICollection<Discussion> Discussions { get; set; } = new List<Discussion>();
    public ICollection<CourseTag> CourseTags { get; set; } = new List<CourseTag>();
}
