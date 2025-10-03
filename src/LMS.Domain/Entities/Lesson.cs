using LMS.Domain.Common;
using LMS.Domain.Enums;

namespace LMS.Domain.Entities;

public class Lesson : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public ContentType ContentType { get; set; }
    public string ContentUrl { get; set; } = string.Empty;
    public int OrderNumber { get; set; }
    public int Duration { get; set; } // in minutes
    public bool IsFree { get; set; } // Free preview lessons
    public string? TranscriptUrl { get; set; }
    public string? AttachmentUrls { get; set; } // JSON array of URLs
    
    // Foreign key
    public int CourseId { get; set; }
    
    // Navigation properties
    public Course Course { get; set; } = null!;
    public ICollection<LessonProgress> LessonProgresses { get; set; } = new List<LessonProgress>();
}
