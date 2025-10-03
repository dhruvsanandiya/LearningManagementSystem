using LMS.Domain.Common;
using LMS.Domain.Enums;

namespace LMS.Domain.Entities;

public class Submission : BaseEntity
{
    public int AssignmentId { get; set; }
    public string StudentId { get; set; } = string.Empty;
    public string? FileUrl { get; set; }
    public string? Content { get; set; }
    public DateTime SubmittedDate { get; set; } = DateTime.UtcNow;
    public int? Grade { get; set; }
    public string? Feedback { get; set; }
    public SubmissionStatus Status { get; set; } = SubmissionStatus.Submitted;

    // Navigation properties
    public virtual Assignment Assignment { get; set; } = null!;
    public virtual ApplicationUser Student { get; set; } = null!;
}

