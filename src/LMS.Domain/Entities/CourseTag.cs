namespace LMS.Domain.Entities;

public class CourseTag
{
    public int CourseId { get; set; }
    public int TagId { get; set; }
    
    // Navigation properties
    public Course Course { get; set; } = null!;
    public Tag Tag { get; set; } = null!;
}
