using LMS.Domain.Common;

namespace LMS.Domain.Entities;

public class Category : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? IconUrl { get; set; }

    // Navigation properties
    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
}

