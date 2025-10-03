using LMS.Domain.Common;

namespace LMS.Domain.Entities;

public class Tag : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    
    // Navigation properties
    public ICollection<CourseTag> CourseTags { get; set; } = new List<CourseTag>();
}
