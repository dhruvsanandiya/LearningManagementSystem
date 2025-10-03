using LMS.Domain.Common;

namespace LMS.Domain.Entities;

public class Certificate : BaseEntity
{
    public string CertificateNumber { get; set; } = string.Empty;
    public DateTime IssueDate { get; set; }
    public string CertificateUrl { get; set; } = string.Empty;
    public string? VerificationCode { get; set; }
    
    // Foreign keys
    public int CourseId { get; set; }
    public int StudentId { get; set; }
    
    // Navigation properties
    public Course Course { get; set; } = null!;
    public User Student { get; set; } = null!;
}
