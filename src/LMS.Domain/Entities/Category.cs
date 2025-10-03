using LMS.Domain.Common;

namespace LMS.Domain.Entities;

public class Category : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? IconUrl { get; set; }
    public bool IsActive { get; set; } = true;
    
    // Navigation properties
    public ICollection<Course> Courses { get; set; } = new List<Course>();
}
