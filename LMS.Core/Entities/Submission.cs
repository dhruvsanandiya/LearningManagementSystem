using System.ComponentModel.DataAnnotations;

namespace LMS.Core.Entities;

public class Submission : BaseEntity
{
    public int AssignmentId { get; set; }
    
    [Required]
    public string StudentId { get; set; } = string.Empty;
    
    [MaxLength(500)]
    public string? FileUrl { get; set; }
    
    [MaxLength(2000)]
    public string? TextSubmission { get; set; }
    
    public int? Grade { get; set; }
    
    [MaxLength(1000)]
    public string? Feedback { get; set; }
    
    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? GradedAt { get; set; }
    
    public SubmissionStatus Status { get; set; } = SubmissionStatus.Submitted;
    
    // Navigation properties
    public virtual Assignment Assignment { get; set; } = null!;
    public virtual ApplicationUser Student { get; set; } = null!;
}