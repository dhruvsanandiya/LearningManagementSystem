using LMS.Domain.Common;

namespace LMS.Domain.Entities;

public class Certificate : BaseEntity
{
    public int CourseId { get; set; }
    public string StudentId { get; set; } = string.Empty;
    public string CertificateNumber { get; set; } = string.Empty;
    public DateTime IssueDate { get; set; } = DateTime.UtcNow;
    public string? CertificateUrl { get; set; }

    // Navigation properties
    public virtual Course Course { get; set; } = null!;
    public virtual ApplicationUser Student { get; set; } = null!;
}

