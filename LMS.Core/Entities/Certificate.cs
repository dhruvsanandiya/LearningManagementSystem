using System.ComponentModel.DataAnnotations;

namespace LMS.Core.Entities;

public class Certificate : BaseEntity
{
    public int CourseId { get; set; }
    
    public string StudentId { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(100)]
    public string CertificateNumber { get; set; } = string.Empty;
    
    public DateTime IssueDate { get; set; } = DateTime.UtcNow;
    
    [MaxLength(500)]
    public string? CertificateUrl { get; set; }
    
    public bool IsValid { get; set; } = true;
    
    // Navigation properties
    public virtual Course Course { get; set; } = null!;
    public virtual ApplicationUser Student { get; set; } = null!;
}