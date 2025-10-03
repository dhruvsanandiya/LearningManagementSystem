using LMS.Domain.Common;

namespace LMS.Domain.Entities;

public class Discussion : BaseEntity
{
    public string Message { get; set; } = string.Empty;
    public int? ParentId { get; set; } // For replies/threads
    public int LikesCount { get; set; }
    public bool IsEdited { get; set; }
    
    // Foreign keys
    public int CourseId { get; set; }
    public int UserId { get; set; }
    
    // Navigation properties
    public Course Course { get; set; } = null!;
    public User User { get; set; } = null!;
    public Discussion? Parent { get; set; }
    public ICollection<Discussion> Replies { get; set; } = new List<Discussion>();
}
