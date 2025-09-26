using System.ComponentModel.DataAnnotations;

namespace LMS.Core.Entities;

public class Assignment : BaseEntity
{
    public int CourseId { get; set; }
    
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;
    
    [MaxLength(2000)]
    public string Description { get; set; } = string.Empty;
    
    public DateTime DueDate { get; set; }
    
    public int MaxMarks { get; set; }
    
    [MaxLength(500)]
    public string? AttachmentUrl { get; set; }
    
    public bool IsActive { get; set; } = true;
    
    // Navigation properties
    public virtual Course Course { get; set; } = null!;
    public virtual ICollection<Submission> Submissions { get; set; } = new List<Submission>();
}