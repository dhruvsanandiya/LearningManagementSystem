using LMS.Domain.Common;

namespace LMS.Domain.Entities;

public class Discussion : BaseEntity
{
    public int CourseId { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public int? ParentId { get; set; }

    // Navigation properties
    public virtual Course Course { get; set; } = null!;
    public virtual ApplicationUser User { get; set; } = null!;
    public virtual Discussion? Parent { get; set; }
    public virtual ICollection<Discussion> Replies { get; set; } = new List<Discussion>();
}

