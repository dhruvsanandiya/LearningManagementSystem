using LMS.Domain.Common;
using LMS.Domain.Enums;

namespace LMS.Domain.Entities;

public class Submission : BaseEntity
{
    public string? SubmissionText { get; set; }
    public string? FileUrls { get; set; } // JSON array of file URLs
    public DateTime SubmittedAt { get; set; }
    public SubmissionStatus Status { get; set; }
    public int? Grade { get; set; }
    public string? Feedback { get; set; }
    public DateTime? GradedAt { get; set; }
    public bool IsLate { get; set; }
    
    // Foreign keys
    public int AssignmentId { get; set; }
    public int StudentId { get; set; }
    public int? GradedBy { get; set; }
    
    // Navigation properties
    public Assignment Assignment { get; set; } = null!;
    public User Student { get; set; } = null!;
}
