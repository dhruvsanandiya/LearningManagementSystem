using System.ComponentModel.DataAnnotations;

namespace LMS.Core.Entities;

public class Discussion : BaseEntity
{
    public int CourseId { get; set; }
    
    public string UserId { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(2000)]
    public string Message { get; set; } = string.Empty;
    
    public int? ParentId { get; set; } // For replies
    
    public bool IsActive { get; set; } = true;
    
    // Navigation properties
    public virtual Course Course { get; set; } = null!;
    public virtual ApplicationUser User { get; set; } = null!;
    public virtual Discussion? Parent { get; set; }
    public virtual ICollection<Discussion> Replies { get; set; } = new List<Discussion>();
}