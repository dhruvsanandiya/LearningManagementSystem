using System.ComponentModel.DataAnnotations;
using LMS.Core.Enums;

namespace LMS.Core.Entities;

public class Lesson : BaseEntity
{
    public int CourseId { get; set; }
    
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;
    
    [MaxLength(1000)]
    public string? Description { get; set; }
    
    [MaxLength(500)]
    public string? ContentUrl { get; set; }
    
    public LessonType Type { get; set; } = LessonType.Video;
    
    public int OrderNumber { get; set; }
    
    public int DurationMinutes { get; set; }
    
    public bool IsFree { get; set; } = false;
    
    // Navigation properties
    public virtual Course Course { get; set; } = null!;
}