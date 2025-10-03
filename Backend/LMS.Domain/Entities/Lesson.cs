using LMS.Domain.Common;
using LMS.Domain.Enums;

namespace LMS.Domain.Entities;

public class Lesson : BaseEntity
{
    public int CourseId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ContentUrl { get; set; }
    public ContentType ContentType { get; set; } = ContentType.Video;
    public int OrderNumber { get; set; }
    public int Duration { get; set; } // in minutes
    public bool IsFree { get; set; } = false;

    // Navigation properties
    public virtual Course Course { get; set; } = null!;
    public virtual ICollection<LessonProgress> LessonProgresses { get; set; } = new List<LessonProgress>();
}

